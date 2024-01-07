---
title: Jadi Core Front-End di Mamikos. Kerjaannya ngapain?
slug: jadi-core-front-end-di-mamikos
description: Apa saja yang di kerjakaan oleh tim Core Front-End Mamikos dan kenapa tim ini ada di Mamikos.
category: blog
featured: cover.png
lang: id
---

<img src="cover.png" alt="Jadi Core Front-End di Mamikos. Kerjaannya ngapain?" />

<p></p>


## Table Of Contents

```toc

```

## Preface

Di Mamikos, saya bergabung di tim Core Front-End atau biasa disingkat Core FE, yang mana saya gak tau kalau bakal masuk tim ini ketika *apply* di Mamikos. Kebetulan juga tim Core ini belum lama terbentuk sebelum saya masuk, jadi bisa dibilang tim Core ini memang baru di Mamikos. Kawan saya, <a href="https://www.linkedin.com/in/gigaprakosa" target="_blank" rel="noopener">Giga Prakosa Hikmata</a>, Engineering Manager di Mamikos adalah salah satu orang yang punya ide untuk membuat tim ini.

Lalu apa kerjaan Core Front-End Engineer dan apa bedanya dengan Front-End Engineer lain di Mamikos? 

Sebagi informasi, Mamikos memiliki beberapa tim (yang disebut *squad*) di dalamnya, yang mana tiap *squad* diciptakan untuk mengurus lingkup tertentu saja dan mengembangkan fitur-fitur untuk mendukung bisnis, seperti fitur booking, listing kos, halaman owner kos, dll. 

Biasanya, tiap-tiap *squad* kurang lebih terdiri dari Project Manager, Back-End Engineer, Front-End Engineer, UI Designer, dan Quality Assurance di dalamnya.

Memecah tim menjadi beberapa squad sebenarnya cukup efektif karena tiap *squad* jadi lebih fokus di satu lingkup saja sehingga hasilnya jadi lebih maksimal.

Karena sudah dipecah menjadi beberapa *squad* dan tiap *squad* mengerjakan fitur-fitur untuk mendukung bisnis di lingkup tertentu, memaksakan anggota tiap *squad* mengurusi hal-hal yang gak berhubungan dengan yang gak mendukung bisnis secara langsung dan diluar lingkup *squad* otomatis akan memberatkan mereka. Karenanya, tim Core FE diciptakan untuk mengurusi hal-hal tersebut. 

Berikut ini adalah apa saja yang saya maksud dengan "hal-hal diluar lingkup *squad"* yang dikerjakan oleh tim Core FE di Mamikos :

## Web Audit Improvement

Salah satu pekerjaan Core FE adalah melakukan improvement terhadap _performance_ <a href="https://www.mamikos.com" target="_blank" rel="noopener">website Mamikos</a>. Kami biasa mengukur _performance_ website Mamikos menggunakan <a href="https://developers.google.com/web/tools/lighthouse" target="_blank" rel="noopener">Lighthouse</a> dari Google. Target kami adalah meningkatkan skor di Lighthouse dan semua hal yang berhubungan dengan _performance_ dan _user experience_.

## Error Monitoring & Inspection

Di Mamikos, selain menggunakan *analytics* dan *event tracker* untuk menganalisis tingkah laku pengguna. Tiap aplikasi yang ada juga dipasang suatu *tool* untuk melaporkan tiap ada *error* yang terjadi saat aplikasi dipakai pengguna. 

Core FE di sini bertugas untuk membaca semua *error* yang telah dilaporkan oleh *tool* tersebut di sisi Front-End, dan kemudian memprosesnya. Cara kami memprosesnya adalah dengan mencari tahu terlebih dahulu bagai mana *error* tersebut bisa terjadi (*reproduce error*), dan lalu memperbaikinya. 

Dengan adanya kegiatan *error monitoring* seperti ini, kami bisa meningkatkan *platform* Mamikos menjadi jauh lebih stabil.

## Membangun Design System

Di pertengahan tahun 2020, kami memutuskan untuk membangun sebuah Design System sendiri, dengan harapan kami bisa punya *single source of truth* untuk tiap komponen, UI yang lebih konsisten, dan mengurangi membuat komponen yang sama berulang-ulang. Nah, tim yang bertanggung jawab untuk mengembangkan design system untuk web adalah tim Core FE. 

Apa saja dan bagaimana proses kami membangun design system Mamikos dari perspektif Front-End Engineer bisa di baca di artikel [Cerita Proses Membangun Design System di Mamikos](https://www.trihargianto.com/cerita-proses-membangun-design-system-di-mamikos/)

## Front-End Ops

Front-End Ops adalah sebutan untuk kegiatan yang kami lakukan yang bertujuan untuk membantu teman-teman di dalam *squad*. Kegiatannya sendiri kurang lebih di pecah menjadi (dan tidak terbatas) ke beberapa poin berikut:

### Squad Helper

Di beberapa momen, kerap kali beban pekerjaan teman-teman FE di sebuah squad bisa sangat tinggi sehingga ada beberapa _task_ yang gak bisa dikerjakan dengan cepat padahal darurat. Nah, Core FE disini bertugas membantu mereka mengerjakan _task_ darurat tersebut. 

### Research

Core FE juga melakukan _research_ terhadap beberapa topik tertentu, _research_ yang kami lakukan sangat bervariasi dan luas. Biasanya topik yang akan di _research_ kami diskusikan dulu apakah topik tersebut layak dan menarik untuk di _research_ atau tidak.

Sebagai contoh, salah satu _research_ yang kami lakukan adalah design system yang saya bahas di atas. Sebelum kami mulai membangun design system, kami melakukan _research_ tentang bagaimana struktur kode yang akan dibangun, teknologi apa yang dipakai, apa _principle_ yang kami pakai, dll. 

Contoh lain, beberapa waktu lalu <a href="https://github.com/vuejs/vue-next/releases/tag/v3.0.0" target="_blank" rel="noopener">VueJS versi 3</a> telah rilis. Karena Mamikos menggunakan VueJS versi 2, maka kami tidak bisa seenaknya upgrade versi 3. Banyak hal yang harus dipertimbangkan sebelum _upgrade_ ke versi terbaru. 

Karenanya, harus dilakukan _research_ terlebih dahulu, apakah VueJS 3 aman dipakai di aplikasi kami yang telah berjalan? apakah *learning curve*-nya tinggi? apa saja yang harus disiapkan sebelum upgrade ke VueJS 3, dll. 

### Membuat Guideline

Guideline/Panduan disini biasanya berbentuk dokumen atau disebut juga Wiki. Kebanyakan, panduan yang kami buat berhubungan dengan hasil _research_ yang telah kami lakukan. Contohnya, beberapa waktu lalu saya melakukan _research_ tentang _principle_ untuk menulis deskripsi pull request yang lebih baik. Setelah selesai melakukan _research_, saya membuat panduan yang akan dibaca teman-teman di squad untuk diikuti. 

## Front-End Engineer Monthly Meetup Organizer

Oh ya, di Mamikos, kami rutin mengadakan meetup yang diikuti semua Front-End engineer setiap bulannya. Acaranya biasa terdiri dari _tech talk_, update _squad_, dan hiburan. Tentu acara ini gak bisa berjalan begitu saja, dan pastinya harus ada yang mengaturnya bukan? 

Nah, Core FE di sini juga bertugas untuk menjadi *organizer* dari meetup bulanan ini. Biasanya kami menyusun acara, menyiapkan slide, dan juga memikirkan ide baru yang akan dilakukan di meetup bulanan ini.

## Penutup

Selain yang saya sebutkan di atas, lingkup yang dikerjakan tim Core FE terus berkembang seiring berjalannya waktu dan kebutuhan.

Bergabung di tim Core merupakan pengalaman yang luar biasa dan sangat baru bagi saya pribadi, karena tiap anggota yang berada di tim tersebut dituntut untuk selalu belajar hal baru. Apakah di perusahaanmu bekerja sekarang memiliki tim Core atau tim yang serupa seperti di Mamikos? Kalau iya dan boleh, kamu bisa _sharing_/menceritakan pengalamanmu di kolom komentar di bawah 😁

Terimakasih 👋
