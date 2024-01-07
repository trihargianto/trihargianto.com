---
title: Ngapain Repot Bikin Automation Test
slug: ngapain-repot-bikin-automation-test
description: Pentingkah Automation Test?
category: blog
featured: cover.jpg
lang: id
---

<img src="cover.jpg" alt="Ngapain Repot Bikin Automation Test" />

<p align="center"><small><span>Photo by <a href='https://www.freepik.com/vectors/technology'>vectorpocket</a></span></small></p>

Saat membuat aplikasi, cara tercepat untuk mem-validasi apakah fitur yang kita bikin bekerja sesuai yang kita harapkan atau belum adalah dengan mencobanya secara langsung.

- Kalau kamu bikin aplikasi web, sesimpel dengan membuka aplikasinya di browser dan dicoba klik sana sini buat memastikan fiturnya bekerja dengan normal.
- Kalau kamu bikin API, mungkin bisa dengan cara menggunakan tools seperti <a href="https://www.postman.com/" target="_blank" rel="noopener">Postman</a>, <a href="https://insomnia.rest/" target="_blank" rel="noopener">Insomnia</a>, atau bahkan via <a href="https://curl.se/" target="_blank" rel="noopener">Curl</a> dan langsung mencoba menembak API nya dari situ.

Setiap selesai mengerjakan fitur, lalu melakukan kegiatan (ngetest manual) di atas, rasa percaya dirimu muncul dan siap menggeser card di *sprint board* dari kolom **progress** ke kolom **done** atau bahkan bilang ke klien kalo fiturnya sudah selesai dikerjakan.

Rasanya memang gak ada yang salah dari proses di atas, dan kita telah men-*deliver* fitur sesuai harapan layaknya developer yang baik.

Lalu apa gunanya Automation Test?

Pada dasarnya, Automation Test adalah kegiatan untuk mengetest aplikasi yang akan/sedang/sudah kamu bikin **secara otomatis**.

Karenanya, kita memang perlu membuat kode lain dari kode yang kamu bikin. Misal kamu bikin suatu fitur di file **Form.js**, berarti kamu juga perlu membuat file test nya juga, misal **Form.test.js**.

Kalau kamu belum pernah sama sekali membuat Automation Test. Sangatlah normal kalau insting penolakanmu bergejolak:

1. Ngapain repot-repot bikin Automation Test, bukannya fitur yang udah bikin cukup ditest secara manual.
2. Fitur yang lagi dibikin jadi lebih lama dong selesainya kalo harus bikin file test.

> Maaf kalau saya terlalu men-generalisir. Paling enggak itu yang ada di benak saya ketika dulu pertama kali belajar bikin Automation Test, hehe.

Di sisi lain, mungkin kamu sering bikin Automation Test di tempatmu bekerja sekarang. Tapi apa alasanmu bikin Automation Test?

1. Karena Automation Test merupakan salah satu poin KPI mu?
2. Kantormu menargetkan Code Coverage 100%? 😓
3. Seseorang yang lebih senior darimu menyuruhmu membuatnya supaya Pull Request mu bisa di *approve*?

Satu-satunya alasan yang masuk akal bagi saya kenapa kita harus membuat Automation Test adalah **Rasa Yakin**.

- Yakin komponen yang kita bikin bekerja sesuai yang kita mau.
- Yakin supaya suatu saat di masa depan nanti ketika kita mengubah/menambah beberapa baris kode, atau bahkan satu baris kode gak bakal merusak apa yang sudah kita bikin sekarang.

Gak bisa dipungkiri, ada harga yang harus dibayar ketika membuat Automation Test. Membuatnya tentu menambah *effort* kita saat membuat fitur, dan terkadang fitur yang kita bikin bisa jadi membutuhkan waktu lebih lama untuk bisa diselesaikan daripada biasanya. Tapi, dengan Automation Test, justru kita bakal menghemat banyak waktu untuk *maintenance*.

Saya lebih memilih mengalokasikan waktu lebih untuk membuat Automation Test daripada harus ditelfon klien/atasan jam 12 malam karena ada bagian yang gak bekerja di aplikasi kita.

Saya sangat suka kutipan dari <a href="https://kentcdodds.com/about/" target="_blank" rel="noopener">Kent C Dodds</a>, seseorang yang sangat menginspirasi saya tentang Automation Test (bahkan artikel ini terinspirasi dari tulisan2 dia):

> Always remember the reason that you're testing is about confidence. If something your test is doing isn't bringing you more confidence, then consider whether you can stop doing it!


<p align="center">. &nbsp; . &nbsp; .</p><br />

Bagaimana denganmu? Apakah kamu selalu membuat Automation Test di setiap aplikasi yang kamu bikin? Apakah menurutmu penting membuat Automation Test? Tinggalkan pendapat/pesan mu di kolom komentar di bawah.

Terimakasih sudah membaca 🙂
