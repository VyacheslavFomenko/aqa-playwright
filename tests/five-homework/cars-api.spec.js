import {expect, test} from "@playwright/test";

const BASE_AUTH_HEADER = process.env.AUTH_HEADER;

test.describe("check create car through API", () => {
    test("Positive 1: ", async ({request}) => {
        const carPayload = {
            carBrandId: 1,
            carModelId: 1,
            initialMileage: 500,
        }

        const response = await request.post(`${process.env.BASE_URL}api/cars`, {
            headers: {
                Authorization: BASE_AUTH_HEADER,
                'Content-Type': 'application/json'
            },
            data: carPayload
        });
        expect(response.status).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('id');
        expect(body.carBrandId).toBe(carPayload.carBrandId);
        expect(body.carModelId).toBe(carPayload.carModelId);
        expect(body.initialMileage).toBe(carPayload.initialMileage);
    });

    test("N: should return 400 statusCode when one parametr is empty", async ({request}) => {

        const payloadMissingMileage = {
            carBrandId: 1,
            carModelId: 1,
        };

        const response = await request.post(`${process.env.BASE_URL}/api/cars`, {
                headers: {
                    Authorization: BASE_AUTH_HEADER,
                    'Content-Type': 'application/json'
                },
                data:
                payloadMissingMileage
            })
        ;

        expect(response.status()).toBe(400);
        const errorBody = await response.json();
        expect(errorBody).toHaveProperty('message');
        expect(errorBody.message.toLowerCase()).toContain('Mileage cost required');
    });
});