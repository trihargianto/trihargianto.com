---
title: Menulis Deskripsi Pull Request yang lebih baik
slug: write-a-better-pull-request-description
description: Apa pentingnya menulis deskripsi di suatu Pull Request dan bagaimana menulis Pull Request yang lebih baik supaya kode kita lebih mudah dipahami orang lain.
category: blog
featured: cover.jpg
lang: id
---

<img src="cover.jpg" alt="Menulis Deskripsi Pull Request yang lebih baik" />

<p align="center"><small><span>Photo by <a href="https://www.pexels.com/@thisisengineering?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels" target="_blank" rel="noopener">ThisIsEngineering</a></span></small></p>

## Table Of Contents

```toc

```

## Preface

Code Review merupakan bagian yang sangat penting ketika mengembangkan sebuah produk digital. Di Github dan beberapa hosting repository, Pull Request (disebut Merge Request di Gitlab) digunakan untuk me-_review_ kode di suatu _branch_ sebelum kode tersebut bisa menjangkau _branch_ master/target. Seringnya membutuhkan anggota tim yang berpengalaman yang harus meluangkan waktu buat membaca, mengevaluasi, merespon, dan memberi masukkan dari kode untuk fitur baru tersebut.

> Saya mengganti kata Pull Request / Merge Request menjadi PR supaya lebih singkat

<p align="center">. &nbsp; . &nbsp; .</p>

## Perspektif Reviewer

Kalau kamu pernah me-_review_ PR, akui saja kalau me-_review_ sebuah PR bukan hal yang mudah. Sebagai Reviewer, sudah jadi tanggung jawabmu buat memastikan kode yang sedang di _review_ merupakan kode yang bagus dan berkualitas sebelum kode tersebut masuk di _branch_ target.

Kamu harus paham apa yang kode tersebut lakukan, bagaimana logikanya, apakah kode tersebut aman dan tidak merusak sistem yang sudah berjalan. Selain itu kamu harus melihat style code nya apakah sudah cukup rapi, apakah ada _typo_, apakah ada cara lain yang lebih singkat, dan untuk melakukannya kamu harus melihat kode yang diubah baris perbaris. _Well_, banyak yang harus dilakukan seorang Reviewer, apalagi kalau kode yang berubah sangat banyak.

<p align="center">. &nbsp; . &nbsp; .</p>

## Perspektif Pembuat Pull Request

Di sisi lain, kamu juga meminta kodemu di-_review_ developer lain. Kamu sedang dikejar _deadline_ tapi kodemu gak kunjung selesai di _review_. Setelah membaca Perspektif Reviewer di atas, harusnya kamu paham kenapa kodemu tak kunjung selesai di _review_. Selain kesulitan Reviewer yang saya sebutkan di atas, Reviewer pasti juga punya kerjaan yang harus dia selesaikan bukan?

Trus gimana caranya kita meringankan beban Reviewer dan kode kita bisa cepat _merged_? Salah satunya adalah dengan menulis deskripsi yang baik.

> Tulisan saya disini merupakan _principles_ yang sampai sekarang selalu ada di kepala & saya terapkan ketika membuat sebuah PR. Tulisan ini terinspirasi dari apa yang diajarkan [Shalabh Aggarwal](https://www.linkedin.com/in/shalabhaggarwal/), ex.Engineering Manager saya terdahulu yang sekarang sudah balik ke India dan bekerja di sana.

<p align="center">. &nbsp; . &nbsp; .</p><br />

## Kenapa saya harus peduli?

<video autoplay loop muted playsinline width="100%">
  <source src="images/why-should-i-care.webm" type="video/webm">
  <source src="images/why-should-i-care.mp4" type="video/mp4">
</video>
<p align="center"><small><i>Gambar 1: Kenapa saya harus peduli?</i></small></p>

Selalu tanamkan di pikiran kalau sebuah PR adalah produkmu. Tiap kali kamu bikin PR, seseorang bernama "Reviewer” adalah kustomer mu. Kamu mau supaya kustomer tersebut membeli produkmu, supaya produkmu yang dalam bentuk PR itu bisa di-_deploy_ ke _server_ secepatnya bukan?

Tiap kali mau bikin PR berhentilah sejenak, bayangkan kamu menjadi si "Reviewer”, trus **tanya ke dirimu sendiri**. "Gimana ya supaya ini mudah dipahami?”.

Kalau kamu belum yakin kenapa menulis deskripsi PR itu penting, mungkin poin-poin berikut bisa membantu:

### Meng-_capture_ konteks

Saya selalu percaya sebuah deskripsi PR itu bukan cuma sebatas hubungan antara pembuat PR dan Reviewer, tapi juga sebagai histori kode di project kita. Suatu saat kita pasti akan melihat sebuah kode dan gak tau itu buat apa, dengan adanya histori PR kita bisa selalu melacak histori terdahulu sampai akhirnya kita bisa paham kenapa kode itu ada.

Tentu gak perlu ada deskripsi PR buat bisa ngeliat kodenya. Tapi yang gak akan bisa kamu temuin di kodenya adalah:

1. "Kenapa perubahan itu dilakukan?"
2. "Apa masalah yang di _solve_ dari kode ini?"
3. "Gimana kode ini bekerja?"
4. "Kenapa kode ini bisa ada di planet ini??"

Sebuah deskripsi PR yang bagus yang bakal menjawab semuanya.

Buat bisa ngerasain _pain point_ nya, sekarang cobalah buka sebuah PR yang udah _merged_ 1tahun yang lalu dan yang berisi lebih dari 100baris kode / 50 file, trus jawab ke 4 pertanyaan di atas.

Susah bukan? Hehe..

### Membawa ke solusi yang terbaik

Deskripsi yang bagus bisa menuntun kita ke sebuah diskusi.

Tentu kamu tau, kamu gak mungkin punya solusi terbaik dari suatu masalah. Seringnya selalu ada orang lain di tim mu yang lebih tau tentang area yang sedang kamu kerjakan dari pada kamu.

Reviewer punya kesempatan buat ngasih kamu alternatif solusi yang lebih baik dari apa yang ada di PR. Tanpa deskripsi yang memberikan gambaran yang jelas ke Reviewer tentang solusi yang kamu bikin, kamu secara gak langsung mengurangi kesempatan diskusi dan tentu mengurangi kesempatan buat adanya kode & solusi yang lebih baik.

### Review jadi lebih mudah

Deskripsi PR yang bagus akan memberikan petunjuk ke Reviewer tentang apa yang bakal dia temukan di kodenya.

Isinya juga bisa berisi informasi tentang apa yang perlu dia fokuskan untuk di _review_, yang kamu gak yakin dari apa yang sudah kamu bikin. Hal ini membuat proses _review_ lebih cepat dan PR tersebut cepat mendapat _feedback_.

### Membuatmu lebih berharga

Kita sebagai developer menghabiskan waktu setiap hari buat mecahin masalah.

Kalau kamu menghabiskan waktu seminggu buat mecahin masalah atau mungkin juga nyari bug, menyisihkan waktu sejam buat nulis deskripsi PR yang mendetail akan lebih baik karena Reviewer atau bahkan rekanmu jadi tau kenapa masalah yang coba kamu pecahkan memang rumit sampai butuh waktu sampai seminggu.

<p align="center">. &nbsp; . &nbsp; .</p><br />

## Pull Request yang ideal

PR yang ideal adalah PR yang kecil. PR kecil bisa mempercepat proses _review_ dan cepat dapat _feedback_. Karena kecil, otomatis jadi lebih mudah bagi si Reviewer buat bisa ngerti konteksnya dan bagaimana logika yang dibikin.

Kalau fitur yang lagi kamu bikin itu besar atau kompleks banget, kamu bisa mecah fiturnya supaya PR nya jadi kecil-kecil.

Kita harus paham bagaimana memecahnya dan berpikir gimana caranya supaya yang kecil-kecil tadi bisa _merged_ tanpa merusak apapun.

Memecah fitur memang gak mudah, dan perlu dibiasakan. Semakin sering kamu memecah fitur, maka akan semakin terbiasa.

> Di tempat saya bekerja sekarang, kalau fitur nya besar maka kami bakal bikin satu _branch_ sendiri yang kami sebut Story. Nah, PR yang kecil-kecil tadi di targetkan ke Story, ketika semua yang kecil-kecil sudah selesai dan semua sudah tersusun di Story, baru dari Story tersebut bikin PR lagi ke _branch_ utama.

<p align="center">. &nbsp; . &nbsp; .</p><br />

## Anatomi Pull Request

Semoga sampai di sini kamu sudah paham pentingnya deskripsi sebuah PR.

Tapi apakah ada aturan tertentu yang bisa di ikuti? Sebenernya tidak ada aturan khusus, tapi setidaknya berikut poin-poin yang saya terapkan ketika membuat PR:

### Title

Sebuah judul PR yang bagus menurut saya harus berupa:

1. Ringkasan singkat tentang apa yang dikerjakan

Judul harus cukup singkat dan informatif sehingga Reviewer langsung tau apa poin utama dari PR yang kamu buat, tanpa dia harus membaca seluruh deskripsi yang ada.

2. Kalimat yang disusun, ditulis layaknya sebuah perintah.

Contohnya, dari yang tadinya **_"Menghapus middleware auth dan menggantinya dengan sistem auth yang baru”_** bisa diganti menjadi **_"Hapus middleware auth dan ganti dengan sistem auth yang baru”_**.

Karena judulnya berupa perintah, bagaimana kita melaksanakan perintah tersebut ada di dalam deskripsi dan kodenya.

### Body

<br />

#### Deskripsi yang informatif

Deskripsi yang ditulis harus informatif. Paling tidak berisi poin-poin berikut:

<p>
✓&nbsp; Apa masalah yang coba buat dipecahkan.<br />
✓&nbsp; Kenapa solusi tersebut menurutmu jadi solusi yang tepat.<br /> 
✓&nbsp; Jika ada kelemahan dari solusi tersebut, juga harus disebutkan.<br />  
✓&nbsp; Apa yang bisa di tingkatkan di masa depan juga harus disebutkan.<br /> 
</p>

Saya sering melihat kebiasaan menulis deskripsi yang buruk, seperti contohnya:

<p>
✕&nbsp; "Fix build”<br />
✕&nbsp; "Fix bugs”<br />
✕&nbsp; "Add patch”<br />
✕&nbsp; "Moving code from A to B”<br />
✕&nbsp; "Kill weird URLs.”<br />
</p>

Gak jelas kan? Bug apa? Patch apa? Kill weird url? Kamu ngapain buat ngebenerinnya?

Di beberapa kasus bahkan gak ada deskripsinya sama sekali 😥

Mungkin kalo kodenya dikit masih bisa kita coba cari tau dari kodenya, kalau changes nya lebih dari 50 file gimana? Hmm...

<img src="images/bad-pr-example.png" width="100%" alt="Bad PR Example" />
<p align="center"><small><i>Gambar 2: Bad PR Example</i></small></p

#### Hasil Unit Tests

Hasil dari unit tests dari fitur yang kamu kerjakan juga bisa ikut disertakan, sehingga Reviewer tau apa saja test case yang kamu buat dan gimana hasilnya.

> Beberapa company biasanya mewajibkan tiap fitur baru yang dibuat, harus datang bersamaan dengan unit tests-nya

#### Screenshots

Kalau kamu punya sesuatu yang bisa kamu bagikan dalam bentuk visual, kamu juga bisa melampirkannya di body PR.

Untuk seorang Front-End Engineer, bagian screenshots di ini bisa dipakai untuk menampilkan hasil UI yang udah dibikin. Kalau kamu mau, kamu juga bisa melampirkan extra gif atau video di bagian ini.

> Tentu bagian screenshots bukan hal wajib apalagi kalau kamu seorang DevOps, Back-End Engineer, atau role lain yang tidak berhubungan dengan visual.

<p align="center">. &nbsp; . &nbsp; .</p><br />

## Template Pull Request

Dengan menerapkan _principle_ yang telah saya sebutkan di atas, kamu bisa meningkatkan kualitas kode dari aplikasimu dan membuka kesempatan untuk diskusi antar developer yang lebih baik.

Lalu gimana caranya company yang berisi ratusan developer bisa mengikuti _principle_ yang sama?

Di tempat bekerja saya sekarang, kami membuat sebuah PR Template yang berisi beberapa pertanyaan yang wajib dijawab siapapun yang ingin membuat PR, supaya semua developer bisa tetap berada di _principle_ yang sama.

Kurang lebih isi template nya mengandung pertanyaan sebagai berikut:

1. "Apa masalah/bug/improvement yang kamu coba selesaikan?”
2. "Bagaimana kamu menyelesaikan masalah tersebut?”
3. "Apa kelemahan dari solusi yang kamu buat?”
4. "Apa yang bisa di tingkatkan dari solusimu sekarang di masa depan?”
5. "Lampiran Screenshots Unit Tests”
6. "Lampiran Screenshots UI (Opsional)”

Cara membuat sebuah template PR bisa ikuti panduan dari Github <a href="https://docs.github.com/en/free-pro-team@latest/github/building-a-strong-community/creating-a-pull-request-template-for-your-repository" target="_blank" rel="noopener">di sini</a>, atau jika kamu pakai Gitlab bisa baca <a href="https://docs.gitlab.com/ee/user/project/description_templates.html" target="_blank" rel="noopener">di sini</a>.

<p align="center">. &nbsp; . &nbsp; .</p><br />

## Penutup

Semua project besar tidak mungkin melewatkan deskripsi tiap PR nya, ini juga alasan kenapa project Open Source di luar sana memiliki kualitas yang bagus. Salah satunya karena mereka selalu melakukan diskusi dari setiap PR yang ada, dan ketika seorang kontributor tidak menjelaskan apapun di PR nya, biasanya kecil kemungkinan PR tersebut bisa di _approve_.

Apa yang saya share di sini adalah berdasarkan dari apa yang saya terapkan sehari-hari, tiap company pastinya punya rule sendiri tentang bagaimana mereka mengatur isi sebuah PR. Kalau company tempatmu bekerja belum menerapkan aturan penulisan deskripsi PR, kamu bisa coba menggunakan _principle_ yang sama dengan yang saya gunakan.
