---
title: Lebih Produktif Dengan Plugin Command Line
description: Beberapa Plugin Command Line yang saya gunakan sehari-hari untuk menunjang produktivitas
category: blog
---

Halo, disini mau sharing beberapa tips di command line yang saya pakai sehari-hari.
Tips yang pengen tak bagikan di sini lebih ke sharing plugin-plugin yang bisa di install di terminal kalian ya.. Niscaya, dengan sharing plugin-plugin yang saya pakai di sini semoga bisa berguna dan membantu hidup kamu 😀

## iTerm

Hampir tiap hari saya pakai command line di kerjaan saya, entah itu buat ngejalanin perintah git, install node dependencies, ngejalanin npm scripts, dan lain-lain. Karena kebetulan saya pake Mac, Terminal bawaan dari Mac tidak cukup bikin saya puas karena kustomisasi yang tersedia cukup sedikit.

Jadi buat ngegantinya, saya install iTerm karena iTerm ini punya banyak opsi yang bisa di kustomisasi, contohnya seperti shortcut, tema, dan banyak pengaturan lain yang bisa kita atur sesuai keinginan kita. Yaa, sebenernya gak banyak sih yang saya kustomisasi di iTerm, tapi karena saya udah terbiasa pake ini dari dulu, jadi belum coba alternatif terminal yang lain.

<img src="./iterm-looks.png" alt="Penampakan iTerm" width="100%"/>
<p align="center"><small>Gambar 1: Penampakan iTerm</small></p>

Tapi ini sharing aja ya, saya gak bilang kamu harus pake iTerm 😀

## [Thefuck](https://github.com/nvbn/thefuck)

Plugin yang pertama yaitu thefuck, ini adalah plugin terminal terlucu yang saya tau. Btw saya tau plugin ini pertama kali dari [om Mul](https://github.com/mul14) 😀

Pasti sering kan kita tiap mau ngejalanin perintah di CLI itu typo. Misal :

- `git status` malah jadi `git stats`
- `yarn` jadi `yan`
- `git log` malah jadi `git lig` 😅
- Atau kasus lain misal mau ngejalanin perintah tertentu ternyata harus pake perintah `sudo`, misal `rm -rf my-folder` gak bisa dan harus pake `sudo` didepannya, jadinya kita harus ngulangin nulisin perintah kita jadi `sudo rm -rf my-folder`.

Cukup _annoying_ bukan?

Nah si [thefuck](https://github.com/nvbn/thefuck) ini ngebantu kita buat ngebenerin typo atau hal lain. Penggunaanya cukup simpel, tiap kali kita gagal ngejalanin suatu perintah, kita tinggal tulis `fuck`, maka perintahnya jalan 😅

<img src="./thefuck-plugin-in-action.gif" alt="Thefuck in action" width="100%"/>
<p align="center"><small>Gambar 2: thefuck in action</small></p>

Kalo kamu perhatikan di video di atas, thefuck masih akan nanya ke kita terlebih dahulu tentang perintah yang kita maksud sebelum dia eksekusi. Jika kita oke, maka kita cukup tekan Enter.
Kalo kita lagi frustasi dan lagi sensitif dan gak pengen ditanya-tanya, kita cukup ketikkan perintah `fuck --yeah` dan thefuck gak bakal nanya kekita terlebih dahulu dan dia langsung akan eksekusi perintah yang dia rasa benar.

<img src="./thefuck-plugin-in-action-2.gif" alt="Thefuck in action" width="100%"/>
<p align="center"><small>Gambar 2: fuck yeah!</small></p>
