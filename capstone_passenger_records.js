
const passengers = [
    {
        pnrCode: "AB12CD",
        passengerName: "Nguyen Van An",
        idNumber: "012345678901",
        flightNumber: "VN202",
        seatNumber: "12A",
        isCheckedIn: false
    },
    {
        pnrCode: "EF34GH",
        passengerName: "Tran Thi Binh",
        idNumber: "B1234567",
        flightNumber: "VN202",
        seatNumber: "12B",
        isCheckedIn: false
    }
];

const availableSeats = [
    "12A", "12B", "12C",
    "14A", "14B", "14C",
    "16A", "16B", "16C"
];

function findPassengerByPnr(pnrCode) {
    return passengers.find(
        passenger =>
            passenger.pnrCode === pnrCode.trim().toUpperCase()
    );
}

function validateIdNumber(idNumber) {
    const value = idNumber.trim();

    const citizenIdPattern = /^\d{12}$/;
    const passportPattern = /^[A-Za-z]\d{7,8}$/;

    return citizenIdPattern.test(value) ||
           passportPattern.test(value);
}

function isPnrUnique(pnrCode) {
    return !passengers.some(
        passenger =>
            passenger.pnrCode === pnrCode.trim().toUpperCase()
    );
}

function isIdNumberUnique(idNumber) {
    return !passengers.some(
        passenger =>
            passenger.idNumber.toUpperCase() ===
            idNumber.trim().toUpperCase()
    );
}

function findAvailableSeat(flightNumber, currentPassenger = null) {
    const usedSeats = passengers
        .filter(passenger =>
            passenger !== currentPassenger &&
            passenger.flightNumber.toUpperCase() ===
            flightNumber.trim().toUpperCase()
        )
        .map(passenger => passenger.seatNumber);

    return availableSeats.find(
        seat => !usedSeats.includes(seat)
    ) || null;
}

function displayPassenger(passenger) {
    console.log(
        `${passenger.pnrCode.padEnd(10)} | ` +
        `${passenger.passengerName.padEnd(22)} | ` +
        `${passenger.flightNumber.padEnd(10)} | ` +
        `${passenger.seatNumber.padEnd(8)} | ` +
        `${passenger.isCheckedIn ? "CHECKED_IN" : "NOT_CHECKED_IN"}`
    );
}

function listPassengers() {
    console.log("\n================ DANH SACH HANH KHACH ================");
    console.log("PNR        | Ho ten                | Chuyen bay | Ghe      | Trang thai");
    console.log("-".repeat(75));

    passengers.forEach(displayPassenger);

    console.log("-".repeat(75));
}

function addPassenger() {
    const pnrCode = prompt("Nhap ma PNR:");

    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong duoc de trong.");
        return;
    }

    if (!/^[A-Za-z0-9]{6}$/.test(pnrCode.trim())) {
        console.log("Ma PNR phai gom 6 ky tu chu hoac so.");
        return;
    }

    if (!isPnrUnique(pnrCode)) {
        console.log("Ma PNR da ton tai.");
        return;
    }

    const passengerName = prompt("Nhap ho ten hanh khach:");

    if (passengerName === null || passengerName.trim() === "") {
        console.log("Ho ten khong duoc de trong.");
        return;
    }

    const idNumber = prompt("Nhap CCCD 12 so hoac ho chieu:");

    if (idNumber === null || !validateIdNumber(idNumber)) {
        console.log("CCCD hoac ho chieu khong hop le.");
        return;
    }

    if (!isIdNumberUnique(idNumber)) {
        console.log("Giay to nay da duoc dang ky.");
        return;
    }

    const flightNumber = prompt("Nhap so hieu chuyen bay:");

    if (flightNumber === null || flightNumber.trim() === "") {
        console.log("So hieu chuyen bay khong duoc de trong.");
        return;
    }

    const seatNumber = findAvailableSeat(flightNumber);

    if (seatNumber === null) {
        console.log("Chuyen bay da het ghe trong.");
        return;
    }

    const passenger = {
        pnrCode: pnrCode.trim().toUpperCase(),
        passengerName: passengerName.trim(),
        idNumber: idNumber.trim().toUpperCase(),
        flightNumber: flightNumber.trim().toUpperCase(),
        seatNumber: seatNumber,
        isCheckedIn: false
    };

    passengers.push(passenger);

    console.log("Them ho so thanh cong.");
    console.log("Ghe du kien: " + seatNumber);
}

function displayBoardingPass(passenger) {
    const line = "=".repeat(48);

    console.log("\n" + line);
    console.log("               BOARDING PASS");
    console.log(line);
    console.log("PASSENGER : " + passenger.passengerName);
    console.log("PNR CODE  : " + passenger.pnrCode);
    console.log("FLIGHT    : " + passenger.flightNumber);
    console.log("SEAT      : " + passenger.seatNumber);
    console.log("STATUS    : CHECKED IN");
    console.log(line);
    console.log("BARCODE   : || ||| | || |||| | ||| || ||||");
    console.log(line);
}

function checkIn() {
    const pnrCode = prompt("Nhap ma PNR de check-in:");

    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong duoc de trong.");
        return;
    }

    const passenger = findPassengerByPnr(pnrCode);

    if (!passenger) {
        console.log("Khong tim thay hanh khach.");
        return;
    }

    if (!validateIdNumber(passenger.idNumber)) {
        console.log("Giay to tuy than khong hop le.");
        return;
    }

    if (passenger.isCheckedIn) {
        console.log("Hanh khach da check-in truoc do.");
        displayBoardingPass(passenger);
        return;
    }

    const newSeat = findAvailableSeat(
        passenger.flightNumber,
        passenger
    );

    if (newSeat === null) {
        console.log("Khong con ghe trong.");
        return;
    }

    passenger.seatNumber = newSeat;
    passenger.isCheckedIn = true;

    console.log("Xac thuc giay to thanh cong.");
    console.log("Doi chieu ho so thanh cong.");
    console.log("Check-in thanh cong.");

    displayBoardingPass(passenger);
}

function searchPassenger() {
    const keyword = prompt("Nhap PNR, so giay to hoac ten:");

    if (keyword === null || keyword.trim() === "") {
        console.log("Thong tin tim kiem khong duoc de trong.");
        return;
    }

    const value = keyword.trim().toLowerCase();

    const results = passengers.filter(passenger =>
        passenger.pnrCode.toLowerCase() === value ||
        passenger.idNumber.toLowerCase() === value ||
        passenger.passengerName.toLowerCase().includes(value)
    );

    if (results.length === 0) {
        console.log("Khong tim thay ho so.");
        return;
    }

    results.forEach(displayPassenger);
}

function showMenu() {
    console.log("\n===== QUAN LY HO SO HANH KHACH =====");
    console.log("1. Hien thi danh sach hanh khach");
    console.log("2. Them ho so hanh khach");
    console.log("3. Xac thuc va check-in");
    console.log("4. Tra cuu ho so");
    console.log("5. Thoat chuong trinh");
}

function main() {
    let choice;

    do {
        showMenu();

        const input = prompt("Nhap lua chon tu 1 den 5:");

        choice = input === null ? "5" : input.trim();

        switch (choice) {
            case "1":
                listPassengers();
                break;

            case "2":
                addPassenger();
                break;

            case "3":
                checkIn();
                break;

            case "4":
                searchPassenger();
                break;

            case "5":
                console.log("Da thoat chuong trinh.");
                break;

            default:
                console.log("Lua chon khong hop le!");
        }
    } while (choice !== "5");
}

main();
