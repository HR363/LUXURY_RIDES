"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const locations = [
        { name: 'Nairobi Westlands', address: 'Westlands, Nairobi, Kenya' },
        { name: 'Nairobi Upperhill', address: 'Upperhill, Nairobi, Kenya' },
        { name: 'Mombasa', address: 'Mombasa, Kenya' },
        { name: 'Nakuru', address: 'Nakuru, Kenya' },
        { name: 'Kisumu', address: 'Kisumu, Kenya' },
    ];
    for (const loc of locations) {
        await prisma.location.upsert({
            where: { name: loc.name },
            update: {},
            create: loc,
        });
    }
    console.log('Seeded locations successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map