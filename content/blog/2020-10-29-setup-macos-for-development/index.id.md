---
title: Setup MacOS Buat Development
slug: setup-macos-for-development
description: Berbagai aplikasi dan pengaturan yang saya gunakan di MacOS untuk development, sebagai seorang web developer.
category: blog
featured: cover.jpg
lang: id
---

<img src="cover.jpg" alt="Setup MacOS Buat Development" />

<p align="center"><small><span>Photo by <a href="https://unsplash.com/@basico?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener">Gustavo Espindola</a></span></small></p>

## Table Of Contents

```toc

```

## Preface

> Artikel ini merupakan dokumentasi hidup, artinya ketika saya pakai sesuatu
> yang baru atau perlu saya tambahkan maka artikel ini bakal saya update juga.

> Terakhir diupdate: 24 Desember 2023

Saat tulisan ini pertama ditulis, saya belum tau cara setup aplikasi,
konfigurasi, dan tools buat development yang sering saya pakai di Macbook secara
cepat. Beberapa kali saya kesulitan ketika harus pegang Macbook dalam keadaan
fresh sesuai kebutuhan saya. Entah itu dapet fasilitas dari kantor, habis
direset, maupun Macbook baru.

Bahkan pernah saya butuh seharian buat konfigurasi semua yang saya butuhkan,
sehingga tidak bisa langsung produktif. Tiap udah ngerasa semuanya komplit, pas
kerja ternyata ada yang kurang dan akhirnya kerjaan keganggu karena harus lanjut
setup lagi biar kerjanya nyaman.

Artikel ini saya bikin sebagai catatan supaya lebih mudah ketika harus setup
ulang nantinya. Karena saya seorang Web Developer, kebanyakan aplikasi dan
konfigurasi yang saya lakukan disini bakal seputar JavaScript / NodeJS. Jadi,
kalau kamu seseorang yang profesinya sama dengan saya, semoga artikel ini bisa
jadi catatanmu juga.

<p align="center">. &nbsp; . &nbsp; .</p>

## Homebrew

Install [Homebrew](https://brew.sh/) sebagai package manager di Mac. Cara
install Homebrew cukup jelas di websitenya.

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

<p align="center">. &nbsp; . &nbsp; .</p>

## Aplikasi Desktop

Aplikasi yang saya digunakan dibagi menjadi dua jenis, yaitu install otomatis
melalui Homebrew dan install manual

### Install Otomatis

Setelah Homebrew ter-install, saya bisa lanjutkan install semua aplikasi yang
saya butuhkan via Homebrew secara otomatis:

```shell
brew install --cask docker google-chrome iterm2 imageoptim kap notion openvpn-connect postman raycast slack spotify sequel-pro visual-studio-code whatsapp
```

<br />

Perintah di atas akan menginstall aplikasi yang saya butuhkan, yaitu:

| Program                                                  | Fungsi                     |
| -------------------------------------------------------- | -------------------------- |
| [Docker](https://www.docker.com/products/docker-desktop) | Environment Tool           |
| [Google Chrome](https://www.google.com/chrome/)          | Web Browser                |
| [iTerm2](https://www.iterm2.com/downloads.html)          | Alternatif Terminal Bawaan |
| [ImageOptim](https://imageoptim.com/mac)                 | Image Compressor           |
| [Kap](https://getkap.co/)                                | Screen Recorder            |
| [Notion](https://www.notion.so/desktop)                  | Aplikasi Catatan           |
| [OpenVPN Connect Client](https://openvpn.net/client/)    | Buat Pakai VPN             |
| [Postman](https://www.postman.com/downloads/)            | API Tool                   |
| [Raycast](htps://raycast.com/)                           | Launcher                   |
| [Slack](https://slack.com/downloads)                     | Komunikasi                 |
| [Spotify](https://www.spotify.com/id/download/mac/b/)    | Musik                      |
| [Sequel Pro](https://sequelpro.com/download)             | Database UI                |
| [Visual Studio Code](https://code.visualstudio.com/)     | Code Editor                |
| [Whatsapp](https://www.whatsapp.com/download)            | Whatsapp Desktop           |

### Install Manual

Karena gak semua aplikasi tersedia di Homebrew Cask secara _default_, jadi harus
install sendiri.

| Program                                                                                     | Fungsi                                             |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| [Codewhisperer](https://aws.amazon.com/codewhisperer/)                                      | Terminal auto completion                           |
| [Focus To-Do](https://www.focustodo.cn/)                                                    | Pomodoro & Todo App                                |
| [LogiOptions+](https://www.logitech.com/id-id/software/logi-options-plus.html)              | Logitech Mouse App                                 |
| [ObinsKit](https://www.hexcore.xyz/obinskit/releases)                                       | [Anne Pro 2](https://getannepro.com/) Keyboard App |
| [XAMPP 7.3.33.0](https://sourceforge.net/projects/xampp/files/XAMPP%20Mac%20OS%20X/7.3.33/) | PHP 7.3 + MySQL Runner                             |

## Shell

Saya terbiasa pakai
[Zsh](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH) sebagai Shell
utama, untungnya karena [MacOS Sonoma](https://www.apple.com/id/macos/sonoma/)
sudah include Zsh sebagai _default_ Shell. Jadi tinggal install
[Oh My Zsh](https://ohmyz.sh/) aja supaya semua plugin yang saya butuhkan
langsung terinstall.

### Install Ohmyzsh

```shell
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Ohmyzsh Plugins

Plugin-plugin yang saya sering pakai di ZSH adalah sebagai berikut:

#### Built-in Plugin

Plugin-plugin yang sudah otomatis ada ketika menginstall Ohmyzsh sehingga
tinggal diaktifkan saja

| Plugin                                                                                          | Fungsi                                      |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [Alias Finder](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/alias-finder)             | Untuk mencari alias di Shell                |
| [Autojump](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/autojump)                     | Lompat direktori di Shell dengan cepat      |
| [Copydir](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/copydir)                       | Copy path direktori yang aktif ke clipboard |
| [Git](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git)                               | Shortcut perintah Git                       |
| [Yarn](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/yarn)                             | Shortcut perintah Yarn                      |
| [ZSH Interactive CD](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/zsh-interactive-cd) | Navigasi direktori lebih mudah              |
| [ZSH Reload](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/zsh_reload)                 | Cara cepat reload konfigurasi ZSH           |

#### External Plugin

Plugin Ohmzsh yang harus di download manual:

| Plugin                                                                  | Fungsi                           |
| ----------------------------------------------------------------------- | -------------------------------- |
| [ZSH Autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) | Autocomplete berdasarkan history |
| [ZSH Vim Mode](https://github.com/softmoth/zsh-vim-mode)                | Shell rasa Vim                   |

Setelah memastikan Built-in dan External Plugin di atas telah terinstall, kita tinggal aktifkan plugin-nya di file **~/.zshrc**

```txt{3,5-16}:title=~/.zshrc
...

alias af="alias-finder -l"

plugins=(
 git
 yarn
 alias-finder
 autojump
 npm
 zsh_reload
 copydir
 zsh-interactive-cd
 zsh-autosuggestions
 zsh-vim-mode
)

...
```

Jangan lupa me-reload konfigurasi **~/.zshrc** file: 

```shell
source ~/.zshrc
```

> Saya pernah membahas tentang plugin-plugin di atas di artikel
> [Koding Lebih Produktif dengan Plugin Terminal](/koding-lebih-produktif-dengan-plugin-terminal/)

## Node.js

Saya memilih buat install Node.js via Node Version Manager (NVM) supaya bisa
ganti-ganti versi dengan mudah, karena sering kali saya perlu ganti ke Node
versi lama maupun ke Node versi baru. Selain itu, untuk _package manager_ saya
masih suka menggunakan [Yarn](https://yarnpkg.com/) ketimbang NPM karena lebih
cepat.

### Install NVM & Node.js

Install NVM

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
```

Install Node Terbaru

```shell
nvm install node
```

Ganti Versi Node

```shell
nvm install xx.xx && nvm use xx.xx
```

Lalu set yang barusan di install sebagai _default_

```shell
nvm alias default xx.xx
```

### Install Yarn via Homebrew

```shell
brew install yarn
```

## Git

Instalasi dan Konfigurasi Git

### Install

Install Git via Homebrew:

```shell
brew install git
```

Setelah Git terinstall, pastikan atur profil di konfigurasi global

```shell
git config --global user.name "Nama Lengkap" && git config --global user.email "alamatemail@mail.com"
```

### Git Syntax Highlighter

Saya juga suka menggunakan [Delta](https://dandavison.github.io/delta/) untuk keperluan _syntax highlighter_ di Git supaya lebih nyaman ketika melakukan `git diff` atau `git show`.

Install Delta:

```shell
brew install git-delta
```

Lalu edit file **~/.gitconfig**. Biasanya untuk konfigurasinya saya seperti ini saja.  

```txt:title=~/.gitconfig
[core]
    pager = delta

[interactive]
    diffFilter = delta --color-only

[delta]
    navigate = true

[merge]
    conflictstyle = diff3

[diff]
    colorMoved = default
```

[Klik disini](https://dandavison.github.io/delta/configuration.html) untuk lihat apa saja konfigurasi yang tersedia.

## System Settings

_Bagian ini saya menggunakan MacOS Sonoma dan tergantung preferensi
masing-masing..._

### Desktop & Dock

- Set "Default web browser" menjadi Google Chrome
- Disable "Show suggested and recent apps in Dock" supaya jumlah Dock konsisten
- Sesuaikan size Dock jadi lebih kecil karena size _default_ menurut saya
  kebesaran

### Accessibility

- Buka "Pointer Control" > "Trackpad Options", dan set "Dragging Style" menjadi
  "Three Finger Drag" supaya bisa drag-n-drop pakai tiga jari.

### Trackpad

- Centang "Tap to click" supaya tidak perlu selalu menekan Trackpad untuk klik

### Keyboard

Walaupun bahasa yang saya pakai di Mac Bahasa Inggris, saya harus memastikan
pengaturan berikut mati supaya tiap kali menulis kata Bahasa Indonesia, Mac gak
berusaha ngubah jadi suatu kata yang dia rasa benar.

Di bagian "Input Sources", klik "Edit" lalu atur opsi berikut:

- Disable "Show Input menu in menu bar"
- Disable "Correct spelling automatically"
- Disable "Capitalize words automatically"
- Disable "Show inline predictive text"
- Disable "Add perios with double-space"
- Disable "Use smart quotes and dashes"

## Misc

Pengaturan lain

### Cara cepat akses screenshots

1. Bikin folder bernama "Screenshots" di Desktop
2. Tekan tombol `Cmd` + `Shift` + `5`. Trus klik "Options" > "Other Location"
3. Pilih Folder yang udah dibikin di step 1
4. Tekan tombol `Esc` buat keluar dari screenshot setting
5. Buka Finder, cari folder "Screenshots" di Desktop, trus drag folder nya ke
   Dock
6. Posisi foldernya udah di Dock, klik kanan di foldernya trus centang "Fan" di
   bagian "view content as" & centang "Name" di bagian "sort by"

<video autoplay loop muted playsinline width="100%">
  <source src="images/accessing-screenshots-faster.webm" type="video/webm">
  <source src="images/accessing-screenshots-faster.mp4" type="video/mp4">
</video>
<p align="center"><small><i>Gambar 1: Akses screenshot dengan cepat</i></small></p>
