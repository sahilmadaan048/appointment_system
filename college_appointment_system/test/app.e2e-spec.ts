import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('College Appointment Booking (e2e)', () => {
  let app: INestApplication;
  let studentTokenA1: string;
  let professorToken: string;
  let studentTokenA2: string;
  let appointmentIdA1: number;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should run the full booking scenario', async () => {
    // 1) Student A1 registers and logs in
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ name: 'Alice1', email: 'a1@example.com', password: 'pass1', role: 'student' })
      .expect(201);
    const resA1 = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'a1@example.com', password: 'pass1' })
      .expect(201);
    studentTokenA1 = resA1.body.access_token;

    // 2) Professor P1 registers and logs in
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ name: 'Prof1', email: 'p1@example.com', password: 'pass1', role: 'professor' })
      .expect(201);
    const resP1 = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'p1@example.com', password: 'pass1' })
      .expect(201);
    professorToken = resP1.body.access_token;

    // 3) Professor P1 creates two availability slots
    const slot1 = { startTime: '2025-12-01T09:00:00Z', endTime: '2025-12-01T10:00:00Z' };
    const slot2 = { startTime: '2025-12-01T10:00:00Z', endTime: '2025-12-01T11:00:00Z' };
    await request(app.getHttpServer())
      .post('/availability')
      .set('Authorization', `Bearer ${professorToken}`)
      .send(slot1)
      .expect(201);
    await request(app.getHttpServer())
      .post('/availability')
      .set('Authorization', `Bearer ${professorToken}`)
      .send(slot2)
      .expect(201);

    // 4) Student A1 views P1's available slots
    const availRes = await request(app.getHttpServer())
      .get(`/availability?professorId=2`)
      .set('Authorization', `Bearer ${studentTokenA1}`)
      .expect(200);
    expect(availRes.body.length).toBe(2);

    // 5) Student A1 books one slot (slot1)
    const bookRes1 = await request(app.getHttpServer())
      .post('/appointments')
      .set('Authorization', `Bearer ${studentTokenA1}`)
      .send({ professorId: 2, timeSlot: slot1.startTime })
      .expect(201);
    appointmentIdA1 = bookRes1.body.id;

    // 6) Student A2 registers and books the other slot (slot2)
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ name: 'Alice2', email: 'a2@example.com', password: 'pass2', role: 'student' })
      .expect(201);
    const resA2 = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'a2@example.com', password: 'pass2' })
      .expect(201);
    studentTokenA2 = resA2.body.access_token;
    await request(app.getHttpServer())
      .post('/appointments')
      .set('Authorization', `Bearer ${studentTokenA2}`)
      .send({ professorId: 2, timeSlot: slot2.startTime })
      .expect(201);

    // 7) Professor P1 cancels A1's appointment
    await request(app.getHttpServer())
      .patch(`/appointments/${appointmentIdA1}/cancel`)
      .set('Authorization', `Bearer ${professorToken}`)
      .expect(200);

    // 8) Student A1 checks no active appointments remain
    const finalRes = await request(app.getHttpServer())
      .get('/appointments')
      .set('Authorization', `Bearer ${studentTokenA1}`)
      .expect(200);
    expect(finalRes.body.length).toBe(0);
  });
});
