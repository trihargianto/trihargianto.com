---
title: Prinsip Frontend Component Testing
description: Cara yang masuk akal untuk melakukan component testing di Frontend
category: blog
featured: cover.jpg
---

<img src="cover.jpg" alt="Perjalanan Belajar Vim" />

<p align="center"><small><span>Original Photo by <a href="https://unsplash.com/photos/macbook-pro-on-top-of-brown-table-1SAnrIxw5OY" target="_blank" rel="noopener">Kari Shea</a></span></small></p>

## Table of Contents

```toc

```

## Ngomongin Automation Testing

Apakah kamu seseorang yang _skeptis_ dan malas untuk menulis automation test di kodemu? Jika iya, maka kamu adalah saya beberapa tahun lalu. 

Simpelnya seperti ilustrasi berikut:

![form.vue and form.test.js](images/form-and-formtest.jpg)

Waktu pertama kali tau kalau konsep "Automation Testing" itu artinya kita membuat kode tambahan dari kode yang kita tulis (kurang lebih seperti gambar di atas), gejolak penolakan datang dari hati yang paling dalam.

Bagaimana tidak, katakanlah kita butuh waktu seharian bikin _logic_ dari kode kita, masih harus bikin satu lagi file test yang bisa aja bikinnya susah juga. "Sungguh merepotkan. Memang apa salahnya di test langsung di _browser_?", begitu pikir saya waktu itu.

Seiring berjalannya waktu, saya akhirnya paham kenapa Automation Test ini penting, bahkan beberapa kali saya tertolong oleh automation test yang saya buat. Misal tidak sengaja merusak kode, si file test ini bisa ngasih tau dengan cepat kalau ada yang salah.

> Saya pernah menulis tentang [kenapa repot bikin automation test](/ngapain-repot-bikin-automation-test/). Saya sarankan kamu membacanya jika kamu belum yakin kenapa kita melakukan automation testing. 

Kalau ada satu kata yang mewakili apa fungsi automation test, maka itu adalah "**Confidence**".

Automation test yang kita buat tidak ada gunanya kalo gak ngasih kita rasa yakin atau confidence. Semakin automation test yang kita buat itu membuat kita yakin fitur yang kita buat itu sesuai apa yang kita inginkan, maka artinya semakin bagus. 

Begitu juga sebaliknya, semakin suatu automation test itu tidak memberikan rasa yakin bahwa fitur berjalan dengan semestinya, maka automation test tersebut tidak ada gunanya.

Dengan kata lain, bagus tidaknya automation test itu tergantung bagaimana kita membuatnya.


## Untuk siapa kita bikin UI 

Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
