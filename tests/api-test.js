const axios = require("axios");

const BACKEND_URL = "http://localhost:5000";
const AI_URL = "http://localhost:8000";

let results = [];

function logResult(name, success, message = "") {
    results.push({ name, success, message });
}

async function timedRequest(fn) {
    const start = Date.now();
    const res = await fn();
    const time = Date.now() - start;
    return { res, time };
}

async function runTests() {

    let ticketId = null;

    /*
    =================================
    AI SERVICE TESTS
    =================================
    */

    try {

        const { res, time } = await timedRequest(() =>
            axios.get(`${AI_URL}/health`)
        );

        logResult("AI Service Health", res.status === 200, `Response ${time}ms`);

    } catch (e) {
        logResult("AI Service Health", false, e.message);
    }



    try {

        const { res } = await timedRequest(() =>
            axios.post(`${AI_URL}/predict-demand`, {
                station: "Biocon Hebbagodi",
                hour: 9,
                day: "Tuesday",
                weather: "Clear",
                event: 0
            })
        );

        logResult("AI Demand Prediction", res.data.crowd_level !== undefined);

    } catch (e) {
        logResult("AI Demand Prediction", false, e.message);
    }



    try {

        const { res } = await timedRequest(() =>
            axios.post(`${AI_URL}/detect-fraud`, {
                entry_station: "Biocon Hebbagodi",
                exit_station: "Central Silk Board",
                entry_hour: 9,
                travel_time: 20,
                ticket_type: "QR",
                distance: 10,
                repeat_usage: 0
            })
        );

        logResult("AI Fraud Detection", res.data.fraud_probability !== undefined);

    } catch (e) {
        logResult("AI Fraud Detection", false, e.message);
    }



    /*
    =================================
    BACKEND API TESTS
    =================================
    */

    try {

        const { res } = await timedRequest(() =>
            axios.get(`${BACKEND_URL}/health`)
        );

        logResult("Backend Health API", res.status === 200);

    } catch (e) {
        logResult("Backend Health API", false, e.message);
    }



    try {

        const { res } = await timedRequest(() =>
            axios.get(`${BACKEND_URL}/api/stations`)
        );

        logResult("Stations API", res.data.length > 0);

    } catch (e) {
        logResult("Stations API", false, e.message);
    }



    /*
    =================================
    BOOKING WORKFLOW
    =================================
    */

    try {

        const { res } = await timedRequest(() =>
            axios.post(`${BACKEND_URL}/api/tickets/book`, {
                source: "Biocon Hebbagodi",
                destination: "Central Silk Board",
                time: "09:30"
            })
        );

        ticketId = res.data.id || res.data.ticket_id;

        logResult("Book Ticket API", !!ticketId);

    } catch (e) {
        logResult("Book Ticket API", false, e.message);
    }



    try {

        const { res } = await timedRequest(() =>
            axios.post(`${BACKEND_URL}/api/tickets/validate`, {
                ticket_id: ticketId
            })
        );

        logResult("Validate Ticket API", res.data.status === "valid");

    } catch (e) {
        logResult("Validate Ticket API", false, e.message);
    }



    try {

        const { res } = await timedRequest(() =>
            axios.post(`${BACKEND_URL}/api/tickets/entry`, {
                ticket_id: ticketId,
                entry_station: "Biocon Hebbagodi"
            })
        );

        logResult("Entry Scan API", res.data.status === "entry recorded");

    } catch (e) {
        logResult("Entry Scan API", false, e.message);
    }

    try {

        await axios.post(`${BACKEND_URL}/api/tickets/entry`, {
            ticket_id: ticketId,
            entry_station: "Biocon Hebbagodi"
        });

        logResult("Double Entry Scan", false);

    } catch (e) {

        if (e.response && e.response.data.status === "invalid") {
            logResult("Double Entry Scan", true);
        } else {
            logResult("Double Entry Scan", false);
        }

    }

    try {

        const { res } = await timedRequest(() =>
            axios.post(`${BACKEND_URL}/api/tickets/exit`, {
                ticket_id: ticketId,
                exit_station: "Central Silk Board"
            })
        );

        logResult(
            "Exit Scan API",
            res.data.status === "exit recorded" &&
            res.data.distance_km !== undefined
        );

    } catch (e) {
        logResult("Exit Scan API", false, e.message);
    }

    try {

        await axios.post(`${BACKEND_URL}/api/tickets/exit`, {
            ticket_id: ticketId,
            exit_station: "Central Silk Board"
        });

        logResult("Double Exit Scan", false);

    } catch (e) {

        if (e.response && e.response.data.status === "invalid") {
            logResult("Double Exit Scan", true);
        } else {
            logResult("Double Exit Scan", false);
        }

    }

    try {

        await axios.post(`${BACKEND_URL}/api/tickets/entry`, {
            ticket_id: ticketId,
            entry_station: "Biocon Hebbagodi"
        });

        logResult("Reuse Ticket After Exit", false);

    } catch (e) {

        if (e.response && e.response.data.status === "invalid") {
            logResult("Reuse Ticket After Exit", true);
        } else {
            logResult("Reuse Ticket After Exit", false);
        }

    }

    /*
    =================================
    FRAUD + PREDICTION APIs
    =================================
    */

    try {

        const { res } = await timedRequest(() =>
            axios.get(`${BACKEND_URL}/api/fraud-alerts`)
        );

        logResult("Fraud Alerts API", res.status === 200);

    } catch (e) {
        logResult("Fraud Alerts API", false, e.message);
    }



    try {

        const { res } = await timedRequest(() =>
            axios.get(`${BACKEND_URL}/api/predictions`)
        );

        logResult("Predictions API", res.status === 200);

    } catch (e) {
        logResult("Predictions API", false, e.message);
    }



    /*
    =================================
    EDGE CASE TESTS
    =================================
    */

    try {

        await axios.post(`${BACKEND_URL}/api/tickets/book`, {
            source: "MG Road",
            destination: "Yelachenahalli",
            time: "10:00"
        });

        logResult("Interchange Validation", false);

    } catch (e) {
        logResult("Interchange Validation", true);
    }



    try {

        await axios.post(`${BACKEND_URL}/api/tickets/exit`, {
            ticket_id: "INVALID123",
            exit_station: "Central Silk Board"
        });

        logResult("Exit Without Entry", false);

    } catch (e) {
        logResult("Exit Without Entry", true);
    }

    try {

        const invalid = await axios.post(`${BACKEND_URL}/api/tickets/validate`, {
            ticket_id: "INVALID123"
        });

        logResult("Invalid Ticket Validation", invalid.data.status === "invalid");

    } catch (e) {
        logResult("Invalid Ticket Validation", false);
    }



    try {

        await axios.post(`${BACKEND_URL}/api/tickets/entry`, {
            ticket_id: "INVALID123",
            entry_station: "Biocon Hebbagodi"
        });

        logResult("Entry With Invalid Ticket", false);

    } catch (e) {
        logResult("Entry With Invalid Ticket", true);
    }



    try {

        await axios.post(`${BACKEND_URL}/api/tickets/book`, {
            source: "Biocon Hebbagodi"
        });

        logResult("Booking Missing Fields", false);

    } catch (e) {
        logResult("Booking Missing Fields", true);
    }



    try {

        await axios.post(`${BACKEND_URL}/api/tickets/book`, {
            source: "Biocon Hebbagodi",
            destination: "Biocon Hebbagodi",
            time: "09:30"
        });

        logResult("Same Source Destination", false);

    } catch (e) {
        logResult("Same Source Destination", true);
    }



    generateReport();
}



function generateReport() {

    console.log("\n========== METRO API TEST REPORT ==========\n");

    let passed = 0;

    results.forEach(r => {

        if (r.success) {
            console.log(`✅ ${r.name}`);
            passed++;
        } else {
            console.log(`❌ ${r.name} → ${r.message}`);
        }

    });

    console.log("\n===========================================");

    console.log(`Total Tests: ${results.length}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${results.length - passed}`);

}



runTests();


// ========== METRO API TEST REPORT ==========   

// ✅ AI Service Health
// ✅ AI Demand Prediction
// ✅ AI Fraud Detection
// ✅ Backend Health API
// ✅ Stations API
// ✅ Book Ticket API
// ✅ Validate Ticket API
// ✅ Entry Scan API
// ✅ Double Entry Scan
// ✅ Exit Scan API
// ✅ Double Exit Scan
// ✅ Reuse Ticket After Exit
// ✅ Fraud Alerts API
// ✅ Predictions API
// ✅ Interchange Validation
// ✅ Exit Without Entry
// ✅ Invalid Ticket Validation
// ✅ Entry With Invalid Ticket
// ✅ Booking Missing Fields
// ✅ Same Source Destination

// ===========================================   
// Total Tests: 20
// Passed: 20
// Failed: 0