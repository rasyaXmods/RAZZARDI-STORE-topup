const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 1. ADMIN MENAMBAH GAME BARU
    const gameML = await prisma.game.create({
        data: {
            name: "Mobile Legends: Bang Bang",
            slug: "mobile-legends"
        }
    });

    // 2. ADMIN MENAMBAH PRODUK (Harga Modal & Margin)
    // Harga modal 19000, margin 3000. (Harga jual = 22000)
    const produkML = await prisma.product.create({
        data: {
            gameId: gameML.id,
            name: "86 Diamonds",
            supplierSku: "MLBB_86", // Kode dari supplier asli
            basePrice: 19000,       // Harga Modal (rahasia)
            margin: 3000            // Keuntungan
        }
    });

    console.log("Data berhasil dimasukkan ke PostgreSQL!");

    // 3. SIMULASI FRONTEND MEMINTA HARGA
    // Mengambil produk dari database
    const produkDiDatabase = await prisma.product.findUnique({
        where: { id: produkML.id }
    });

    // Menghitung harga jual secara dinamis dari database
    const hargaJual = produkDiDatabase.basePrice + produkDiDatabase.margin;
    
    console.log(`Produk: ${produkDiDatabase.name}`);
    console.log(`Harga Jual di Web: Rp ${hargaJual}`); 
    // Output: Harga Jual di Web: Rp 22000
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());