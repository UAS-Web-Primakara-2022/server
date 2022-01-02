# UAS Server

Server created for TAK Management System for STMIK Primakara (UAS Matkul Web)

### How to run this project?

1. Fork Repositori Ini

2. Git clone dulu

```sh
$ git clone https://github.com/{username-anda}/server.git
```

3. Tambahkan upstream pada hasil clone tersebut

```sh
$ git remote add upstream https://github.com/UAS-Web-Primakara-2022/server.git
```

4. Copy file .env.example menjadi .env

5. Install seluruh package agar bisa dijalankan

```sh
$ npm i
```

6. Setup database. Lalu isi konfigurasinya di `.env` sesuai pengaturan database. Contoh:

```sh
...
DATABASE_URL=DATABASE_URL=postgresql://johndoe:mypassword@localhost:5432/mydb?schema=public
JWTSECRET=secret
PORT=3000
...
```

7. Setup aws. Lalu isi konfigurasinya di `.env` sesuai pengaturan IAM di aws. Contoh:

```sh
...
AWS_ACCESS_KEY_ID=your_aws_accesskey
AWS_SECRET_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET=your_aws_bucket
...
```

7. Jalankan command berikut:

```sh
npx prisma migrate dev
npx prisma generate
```

8. Jalankan command berikut kalo mau buat seeder:

```sh
npx prisma db seed
```

9. Jika ingin menjalankan aplikasi, jalankan command berikut:

```sh
npm run dev
```

### For Deploy

NOTE: Make sure nodejs intalled [install node js with nvm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04#option-3-%E2%80%94-installing-node-using-the-node-version-manager)

1. Install docker. Lalu jalankan docker-compose

```sh
docker-compose up
```

2. Copy file `.env.example` menjadi `.env`. Pastikan semua ENV sudah terisi dengan benar

3. Install depedencies

```sh
npm i
```

4. Jalankan command berikut, secara berurutan satu-satu untuk konfigurasi database:

```sh
npx prisma migrate deploy
npx prisma generate
npx prisma db seed
```

5. Install PM2 untuk node manager

```sh
sudo npm install -g pm2
```

6. Jalankan apps dengan mode production

```sh
npm run prod
```

7. (Optional) Lalu setting NGINX
   [Configure NGINX](https://nothinux.id/reverse-proxy-aplikasi-node-js-dengan-nginx/)
