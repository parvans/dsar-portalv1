import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

export const prisma = new PrismaClient({
    adapter,
});

const mainfunc = async()=>{
    const adminPassword = await bcrypt.hash('admin@123',10);
    const ownerPassword = await bcrypt.hash('owner@123',10);

    await prisma.user.upsert({
        where:{email:'admin@dsar.com'},
        update:{},
        create:{
            email:'admin@dsar.com',
            password:adminPassword,
            role:'admin'
        }
    });

    await prisma.user.upsert({
        where:{email:'owner@dsar.com'},
        update:{},
        create:{
            email:'owner@dsar.com',
            password:ownerPassword,
            role:'owner'
        }
    });

    console.log("Seed admin and owner");

}

mainfunc()
.catch((error)=>{
    console.log("Error",error);
    
})
.finally(async()=>{
    await prisma.$disconnect()
})