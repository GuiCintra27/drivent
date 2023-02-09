import { prisma } from "@/config";
import { createHotelWithRooms } from "./hotels-factory";
import { createUser } from "./users-factory";

export async function createBooking(userId: number, fill: boolean) {
  const hotel = await createHotelWithRooms();

  const booking = await prisma.booking.create({
    data: {
      userId,
      roomId: hotel.Rooms[0].id,
    }
  });

  if (fill === true) {
    await prisma.booking.create({
      data: {
        userId,
        roomId: hotel.Rooms[0].id,
      }
    });
  }

  return {
    id: booking.id,
    Room: {
      ...hotel.Rooms[0]
    }
  };
}

export async function createBookingWithoutUserId(fill?: boolean) {
  const user = await createUser();
  const user2 = await createUser();
  const hotel = await createHotelWithRooms();

  const booking = await prisma.booking.create({
    data: {
      userId: user.id,
      roomId: hotel.Rooms[0].id,
    }
  });

  if (fill === true) {
    await prisma.booking.create({
      data: {
        userId: user2.id,
        roomId: hotel.Rooms[0].id,
      }
    });
  }

  return {
    id: booking.id,
    Room: {
      ...hotel.Rooms[0]
    }
  };
}

export async function verifyBooking(id: number) {
  return prisma.booking.findUnique({
    where: { id }
  });
}
