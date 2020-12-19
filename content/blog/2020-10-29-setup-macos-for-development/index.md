---
title: Setup MacOS Buat Development
description: Berbagai aplikasi dan pengaturan yang saya gunakan di MacOS untuk development, sebagai seorang web developer.
category: blog
featured: cover.jpg
---

<img src="cover.jpg" alt="Setup MacOS Buat Development" />

<p align="center"><small><span>Photo by <a href="https://unsplash.com/@basico?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener">Gustavo Espindola</a></span></small></p>

## Table Of Contents

```toc

```

## Preface

> Artikel ini merupakan dokumentasi hidup, artinya ketika saya pakai sesuatu yang baru atau perlu saya tambahkan maka artikel ini bakal saya update juga.

Sampai saat tulisan ini ditulis, saya belum tau cara setup aplikasi, konfigurasi, dan tools buat development yang sering saya pakai di Macbook secara cepat. Beberapa kali saya kesulitan ketika harus pegang Macbook yang dalam keadaan fresh sesuai kebutuhan saya. Entah itu dapet fasilitas dari kantor, habis direset, maupun Macbook baru.

Bahkan pernah saya butuh seharian buat konfigurasi semua yang saya butuhkan, sehingga tidak bisa langsung produktif. Tiap udah ngerasa semuanya komplit, pas kerja ternyata ada yang kurang dan akhirnya kerjaan keganggu karena harus lanjut setup lagi biar kerjanya nyaman.

Artikel ini saya bikin sebagai catatan supaya lebih mudah ketika harus setup ulang nantinya. Karena saya seorang web developer, kebanyakan aplikasi dan konfigurasi yang saya lakukan disini bakal seputar JavaScript / NodeJS. Jadi, kalau kamu seseorang yang profesinya sama dengan saya, semoga artikel ini bisa jadi catatanmu juga.

<p align="center">. &nbsp; . &nbsp; .</p>

## Homebrew

Install [Homebrew](https://brew.sh/) sebagai package manager di Mac. Cara install Homebrew cukup jelas di websitenya.

```shell{promptUser: tri}
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

<p align="center">. &nbsp; . &nbsp; .</p>

## Aplikasi

Berikut aplikasi yang selalu saya install:

| Program                                                        | Fungsi                     |
| -------------------------------------------------------------- | -------------------------- |
| [Visual Studio Code](https://code.visualstudio.com/)           | Code Editor                |
| [Google Chrome](https://www.google.com/chrome/)                | Web Browser                |
| [iTerm2](https://www.iterm2.com/downloads.html)                | Alternatif Terminal Bawaan |
| [Docker](https://www.docker.com/products/docker-desktop)       | Environment Tool           |
| [Slack](https://slack.com/downloads)                           | Komunikasi                 |
| [Spotify](https://www.spotify.com/id/download/mac/b/)          | Musik                      |
| [Postman](https://www.postman.com/downloads/)                  | API Tool                   |
| [Notion](https://www.notion.so/desktop)                        | Aplikasi Catatan           |
| [Sequel Pro](https://sequelpro.com/download)                   | Database UI                |
| [Gifox](https://gifox.io/)                                     | Gif Recorder               |
| [ImageOptim](https://imageoptim.com/mac)                       | Image Compressor           |
| [Rectangle](https://rectangleapp.com/)                         | Resize Window Tool         |
| [Git](https://git-scm.com/download/mac)                        | Version Control            |
| [Yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable) | Node Package Manager       |
| [Neovim](https://neovim.io/)                                   | Vim Alternative            |
| [Logi Options](https://www.logitech.com/en-us/product/options) | Logitech Mouse App         |

### Install Otomatis

Setelah Homebrew terinstall, saya bisa install semua aplikasi yang saya butuhkan via Homebrew secara otomatis.

```shell{promptUser: tri}
brew install git yarn neovim && brew cask install visual-studio-code google-chrome iterm2 docker slack spotify postman notion sequel-pro gifox imageoptim rectangle
```

### Install Manual

Karena gak semua aplikasi tersedia di Homebrew Cask secara _default_, jadi harus install sendiri.

- Logi Options: https://www.logitech.com/en-us/product/options

## Shell

Saya terbiasa pakai [Zsh](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH) sebagai Shell utama, untungnya karena MacOS Catalina sudah include Zsh sebagai _default_ Shell. Jadi tinggal install [Oh My Zsh](https://ohmyz.sh/) aja supaya semua plugin yang saya butuhkan langsung terinstall.

```shell{promptUser: tri}
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Plugin-plugin yang saya sering pakai di ZSH adalah sebagai berikut:

### Built-In Plugin

Plugin-plugin yang sudah otomatis ada ketika menginstall Oh-My-ZSH

| Plugin                                                                                          | Fungsi                                      |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [Git](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git)                               | Shortcut perintah Git                       |
| [Yarn](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/yarn)                             | Shortcut perintah Yarn                      |
| [Alias Finder](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/alias-finder)             | Untuk mencari alias di Shell                |
| [Autojump](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/autojump)                     | Lompat direktori di Shell dengan cepat      |
| [ZSH Reload](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/zsh_reload)                 | Cara cepat reload konfigurasi ZSH           |
| [Copydir](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/copydir)                       | Copy path direktori yang aktif ke clipboard |
| [ZSH Interactive CD](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/zsh-interactive-cd) | Navigasi direktori lebih mudah              |

### External Plugin

Plugin-plugin yang harus download manual

| Plugin                                                                  | Fungsi                           |
| ----------------------------------------------------------------------- | -------------------------------- |
| [ZSH Autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) | Autocomplete berdasarkan history |
| [ZSH Vim Mode](https://github.com/softmoth/zsh-vim-mode)                | Shell rasa Vim                   |

Jalankan perintah berikut untuk menginstall plugin eksternal di atas

```shell{promptUser: tri}
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions && cd ~/.oh-my-zsh/custom/plugins && git clone https://github.com/softmoth/zsh-vim-mode.git
```

### Aktifkan Plugin di `~/.zshrc`

Setelah semua plugin siap, kita tinggal aktifkan pluginnya di file `~/.zshrc` dan atur beberapa konfigurasi di pluginnya

```
# Aktifkan keymap jj di plugin ZSH Vim Mode
VIM_MODE_VICMD_KEY='jj'

# Buat alias untuk alias-finder supaya perintahnya lebih pendek
alias af="alias-finder -l"

# Daftar plugin yang terpasang
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
```

> Saya pernah membahas tentang plugin-plugin di atas di artikel [Koding Lebih Produktif dengan Plugin Terminal](/koding-lebih-produktif-dengan-plugin-terminal/)

## Node.js

Sebenarnya Node.JS sudah otomatis terinstall ketika kita menginstall Yarn via Homebrew di atas, tapi biasanya yang didownload merupakan versi terbaru. Supaya bisa ganti-ganti versi dengan mudah, saya perlu menginstall Node Version Manager (NVM) karena sering kali saya perlu ganti ke Node versi lama maupun ke Node versi baru.

### Install NVM

```shell{promptUser: tri}
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
```

### Install Node Terbaru

```shell{promptUser: tri}
nvm install node
```

### Ganti Versi Node

```shell{promptUser: tri}
nvm install xx.xx && nvm use xx.xx
```

Lalu set yang barusan di install sebagai _default_

```shell{promptUser: tri}
nvm alias default xx.xx
```

## Git

Setelah Git terinstall, pastikan atur profil di konfigurasi global

```shell{promptUser: tri}
git config --global user.name "Nama Lengkap" && git config --global user.email "alamatemail@mail.com"
```

## Pengaturan Aplikasi

Setelah menginstal semua aplikasi di atas, ada beberapa aplikasi yang perlu diatur sesuai preferensi saya

### Visual Studio Code

_Kamu bisa skip ini kalau preferensimu berbeda dengan saya_

#### Theme & Extensions

Saya sudah membuat sebuah repository di [Github](https://github.com/trihargianto/vscode-extensions-installer) untuk menginstall semua yang saya butuhkan. Sehingga untuk menginstall semua extensions yang dibutuhkan, cukup menjalankan perintah berikut: 

```shell{promptUser: tri}
git clone https://github.com/trihargianto/vscode-extensions-installer ~/vscode-exts && ~/vscode-exts/script.sh && rm -rf ~/vscode-exts
```

Perintah di atas akan menginstall semua extensions VSCode yang disebutkan [di sini](https://github.com/trihargianto/vscode-extensions-installer#available-extensions).

#### Settings

VSCode Setting milik saya

`gist:trihargianto/c33c03f151645387da3c4308927632d2#settings.json`

## System Preferences

_Bagian ini kembali ke selera masing-masing._

### General

- Set Google Chrome sebagai _default browser_

### Dock

- Disable "Show recent application in Dock" supaya jumlah dock konsisten
- Sesuaikan Size Dock jadi lebih kecil karena size \_default_nya menurut saya kebesaran

### Accessibility

- Atur Pointer Control > Trackpad Options > Enable draging (Three finger drag) supaya bisa drag-n-drop pakai tiga jari.

### Trackpad

- Centang "Tap to click"

### Keyboard

Walaupun bahasa yang saya pakai di Mac Bahasa Inggris, saya harus memastikan pengaturan berikut mati supaya tiap kali menulis kata Bahasa Indonesia, Mac gak berusaha ngubah jadi suatu kata yang dia rasa benar.

- Disable "Correct spelling automatically"
- Disable "Capitalize words automatically"
- Disable "Add period with double-space"
- Disable "Use smart quotes and dashes"

## Misc

Pengaturan lain

### Cara cepat akses screenshots

1. Bikin folder bernama "Screenshots" di Desktop
2. Tekan tombol `Cmd` + `Shift` + `5`. Trus klik "Options" > "Other Location"
3. Pilih Folder yang udah dibikin di step 1
4. Tekan tombol `Esc` buat keluar dari screenshot setting
5. Buka Finder, cari folder "Screenshots" di Desktop, trus drag folder nya ke Dock
6. Posisi foldernya udah di Dock, klik kanan di foldernya trus centang "Fan" di bagian "view content as" & centang "Name" di bagian "sort by"

<video autoplay loop muted playsinline width="100%">
  <source src="accessing-screenshots-faster.webm" type="video/webm">
  <source src="accessing-screenshots-faster.mp4" type="video/mp4">
</video>
<p align="center"><small><i>Gambar 1: Akses screenshot dengan cepat</i></small></p>
