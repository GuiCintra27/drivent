import faker from "@faker-js/faker";
import { generateCPF, getStates } from "@brazilian-utils/brazilian-utils";
import { User, Enrollment } from "@prisma/client";

import { createUser } from "./users-factory";
import { prisma } from "@/config";

export function createHotel(){
    return prisma.hotel.create({
        data:{
            name: faker.name.findName(),
            image: "https://play-lh.googleusercontent.com/V_P-I-UENK93ahkQgOWel8X8yFxjhOOfMAZjxXrqp311Gm_RBtlDXHLQhwFZN8n4aIQ"
        }
    })
}