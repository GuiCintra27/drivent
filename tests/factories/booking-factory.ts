import faker from "@faker-js/faker";
import { prisma } from "@/config";
import { createHotelWithRooms } from "./hotels-factory";

export async function createBooking(userId: number, fill: boolean) {
  const hotel = await createHotelWithRooms();

  const booking = await prisma.booking.create({
    data:{
      userId,
      roomId: hotel.Rooms[0].id,
    }
  });

  if(fill === true){
    await prisma.booking.create({
      data:{
        userId,
        roomId: hotel.Rooms[0].id,
      }
    });
  }

  return {
    id: booking.id,
    Room:{
        ...hotel.Rooms[0]
    }
  }
}