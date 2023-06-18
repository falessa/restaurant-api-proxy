import fetch from 'cross-fetch';

async function makeRequest(url: string, body: string, token: string) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        body,
    });
    const { data }: any = await response.json();

    return data;
}

export const ServiceResolvers = {
    Query: {
        searchBusinesses: async (_: any, { term, location }: any, { token }: any) => {
            const url = `https://api.yelp.com/v3/graphql`;
            const body = JSON.stringify({
                query: `
                    query SearchBusinesses($term: String!, $location: String!) {
                        search(term: $term, location: $location) {
                            business {
                                id
                                name
                                rating
                                photos
                                hours {
                                    is_open_now
                                }
                                location {
                                    address1
                                    city
                                    state
                                    country
                                    postal_code
                                    formatted_address
                                }
                                review_count
                                reviews {
                                    id
                                    rating
                                    text
                                    time_created
                                    user {
                                        id
                                        profile_url
                                        name
                                        image_url
                                    }
                                }
                            }
                        }
                    }
                `,
                variables: { term, location },
            });

            const response = await makeRequest(url, body, token);

            return response.search.business;
        },

        reviews: async (_: any, { business }: any, { token }: any) => {
            const url = `https://api.yelp.com/v3/graphql`;
            const body = JSON.stringify({
                query: `
                    query Reviews($business: String!) {
                        reviews(business: $business) {
                            review {
                                id
                                text
                                rating
                                user {
                                    name
                                    profile_url
                                    image_url
                                }
                                url
                            }
                        }
                    }
                `,
                variables: { business },
            });

            const response = await makeRequest(url, body, token);

            return response.reviews.review;
        }
    }
};
