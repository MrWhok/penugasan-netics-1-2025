const request = require("supertest");
const moment = require("moment-timezone");
const { app, server } = require("./app");


describe("GET /health", () => {
    let response;

    beforeAll(async () => {
        response = await request(app).get("/health");
    });

    afterAll(() => {
        server.close(); 
    });


    it("should return status 200", () => {
        expect(response.statusCode).toEqual(200);
    });

    it("should return correct JSON structure", () => {
        expect(response.body).toEqual(
            expect.objectContaining({
                nama: expect.any(String),
                nrp: expect.any(String),
                status: expect.any(String),
                timestamp: expect.any(String),
                uptime: expect.any(Number),
            })
        );
    });

    it("should return correct values for nama, nrp, and status", () => {
        expect(response.body.nama).toBe("Tunas Bimatara Chrisnanta Budiman");
        expect(response.body.nrp).toBe("5025231999");
        expect(response.body.status).toBe("UP");
    });

    it("should return timestamp in correct format", () => {
        const timestampRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        expect(response.body.timestamp).toMatch(timestampRegex);
    });

    it("should return timestamp in Asia/Jakarta timezone", () => {
        const currentTimeJakarta = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
        expect(response.body.timestamp).toBe(currentTimeJakarta);
    });

    it("should have uptime greater than 0", () => {
        expect(response.body.uptime).toBeGreaterThan(0);
    });

    it("should listen on port 3000", () => {
        expect(server.address().port).toBe(3000);
    });
});
