import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'
import { convertHourToMinute } from './utils/convertHourToMinute';
import { convertMinuteToHour } from './utils/convertMinuteToHour';


const app = express();

app.use(express.json());

app.use(cors());

const prisma = new PrismaClient({
  log: ['query'],
});

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  });
  return res.status(200).json(games);
});

app.post('/game/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body: any = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourToMinute(body.hourStart),
      hourEnd: convertHourToMinute(body.hourEnd),
      discord: body.discord,
      useVoiceChannel: body.useVoiceChannel
    }
  });
  
  return res.status(201).json(ad);
});

app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
      yearsPlaying: true,
      useVoiceChannel: true,
    },
    where: {
      gameId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return res.status(200).json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinuteToHour(ad.hourStart),
      hourEnd: convertMinuteToHour(ad.hourEnd),
    }
  }));
});
app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  });
  return res.status(200).json({
    discord: ad.discord
  });
});

app.listen(3333, () => {
  console.log("Listening on port 3333");
});