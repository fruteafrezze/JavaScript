// Function Exception Handling yang bisa dipakai di mana saja
function exceptionHandling(callback) {
    try {
        callback(); // Jalankan function yang dilempar ke sini
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// Function untuk validasi Nama
function validateNama(nama) {
    if (nama === "") {
        throw new Error("Nama tidak boleh kosong!");
    }
    if (/\d/.test(nama)) {
        throw new Error("Nama tidak boleh mengandung angka!");
    }
}

// Function untuk validasi Jumlah
function validateJumlah(jumlah) {
    jumlah = parseInt(jumlah, 10);
    if (isNaN(jumlah) || jumlah <= 0) {
        throw new Error("Jumlah harus berupa angka positif!");
    }
    return jumlah;
}

// Function untuk validasi Pilihan
function validatePilihan(pilihan) {
    if (pilihan === "") {
        throw new Error("Semua pilihan harus diisi!");
    }
    if (!isNaN(pilihan)) {
        throw new Error("Pilihan tidak boleh berupa angka!");
    }
}

// Function utama dengan Exception Handling
function showPilihan() {
    exceptionHandling(() => { // Bungkus dalam exceptionHandling()
        let namaInput = document.getElementById("nama");
        let jumlahInput = document.getElementById("jumlah");
        let container = document.getElementById("pilihan-container");

        let nama = namaInput.value.trim();
        let jumlah = jumlahInput.value.trim();

        container.innerHTML = ""; // Hapus input sebelumnya

        validateNama(nama);
        jumlah = validateJumlah(jumlah);

        namaInput.disabled = true;
        jumlahInput.disabled = true;
        

        for (let i = 1; i <= jumlah; i++) {
            let label = document.createElement("label");
            label.innerText = "Pilihan " + i + " : ";
            
            let input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Teks Pilihan " + i;
            input.id = "pilihan" + i;

            container.appendChild(label);
            container.appendChild(input);
            container.appendChild(document.createElement("br"));
        }

        let button = document.createElement("button");
        button.innerText = "OK";
        button.onclick = showSelection;
        container.appendChild(document.createElement("br"));
        container.appendChild(button);
    });
}

// Function untuk menampilkan dropdown
function showSelection() {
    exceptionHandling(() => {
        let jumlah = parseInt(document.getElementById("jumlah").value, 10);
        let selectionContainer = document.getElementById("selection-container");
        selectionContainer.innerHTML = "";

        let select = document.createElement("select");
        select.id = "selectedOption";

        for (let i = 1; i <= jumlah; i++) {
            let pilihan = document.getElementById("pilihan" + i).value.trim();
            validatePilihan(pilihan);

            let option = document.createElement("option");
            option.value = pilihan;
            option.innerText = pilihan;
            select.appendChild(option);
        }

        selectionContainer.appendChild(select);
        selectionContainer.appendChild(document.createElement("br"));

        let button = document.createElement("button");
        button.innerText = "OK";
        button.onclick = showFinalResult;
        selectionContainer.appendChild(button);
    });
}

// Function untuk menampilkan hasil akhir
function showFinalResult() {
    exceptionHandling(() => {
        let nama = document.getElementById("nama").value.trim();
        let jumlah = parseInt(document.getElementById("jumlah").value, 10);
        let selected = document.getElementById("selectedOption").value;
        let hasil = `Hallo, nama saya ${nama}, saya mempunyai sejumlah ${jumlah} pilihan yaitu `;

        let pilihanList = [];
        for (let i = 1; i <= jumlah; i++) {
            pilihanList.push(document.getElementById("pilihan" + i).value.trim());
        }

        hasil += pilihanList.join(", ") + `, dan saya memilih ${selected}.`;
        document.getElementById("result").innerText = hasil;
    });
}
