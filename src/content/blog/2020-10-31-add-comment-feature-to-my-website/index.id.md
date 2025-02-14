---
title: Menambah fitur komentar di web saya
slug: add-comment-feature-to-my-website
description: Memanfaatkan Utterances untuk membuat fitur komentar berdasarkan issues di Github
featured: cover.png
pubDate: "Oct 31 2020"
---

Sebenarnya saya gak berpikiran menambahkan fitur komentar di web ini ketika web ini pertama kali dibuat, tapi setelah dipikir-pikir ya gak ada salahnya kalau ada fitur komentarnya, hehe.
Setelah menimang-nimang antara bikin fiturnya sendiri atau pakai _third-party service_ seperti <a href="https://developers.facebook.com/docs/plugins/comments/" target="_blank" rel="noopener">Facebook comment</a> dan <a href="https://disqus.com/" target="_blank" rel="noopener">Disqus</a>, saya akhirnya memutuskan memakai _library_ bernama <a href="https://utteranc.es/" target="_blank" rel="noopener">Utterances</a>.

<a href="https://utteranc.es/" target="_blank" rel="noopener">Utterances</a> adalah sebuah _library_ yang memungkinkan kita menambahkan fitur komentar di web dengan memanfaatkan Github issue.

Cara kerjanya, Utterances bakal bikin _issue_ di Github secara otomatis tiap kali ada yang ngasih komentar di suatu artikel. Judul _issue_-nya sendiri nanti bakal di ambil dari URL web.

Oh ya, buat nampung semua issue yang di generate Utterances, saya membuat satu repository kosongan bernama <a href="https://github.com/trihargianto/comments" target="_blank" rel="noopener">comments</a>. Dengan begini, repository <a href="https://github.com/trihargianto/trihargianto.com" target="_blank" rel="noopener">website ini</a> bisa lebih bersih.

Menurut saya ini _library_ yang keren banget. Thanks buat <a href="https://github.com/jdanyow" target="_blank" rel="noopener">Jeremy Danyow</a> yang bikin _library_ nya, hehe.

Dengan begini, siapapun yang mau komentar, otomatis harus punya akun Github. Ya walaupun ini jadi menutup kesempatan orang yang gak punya akun Github buat ngasih komentar, saya rasa gak papa karena memang kebanyakan tulisan saya di sini memang seputar teknis dan saya berasumsi setiap developer pastinya punya akun Github.
