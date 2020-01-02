import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import faker from 'faker';

@Injectable({
  providedIn: 'root'
})
export class SeedService {
  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {}

  async createFakeData(maxRandomUserCount, maxRandomArticleCount) {
    console.log('works');

    const randomUserCount = Math.floor(Math.random() * maxRandomUserCount);
    for (let i = 0; i <= randomUserCount; i++) {
      const fakeUser = {
        displayName: faker.name.findName(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        photoURL: faker.internet.avatar()
      };

      console.log('fakeUser', i);
      console.log(fakeUser);

      try {
        const {
          user: { uid }
        } = await this.afAuth.auth.createUserWithEmailAndPassword(
          faker.internet.email(),
          '123456'
        );
        await this.afStore
          .collection('users')
          .doc(uid)
          .set({ ...fakeUser, uid });

        const randomArticleCount = Math.floor(
          Math.random() * maxRandomArticleCount
        );
        for (let i = 0; i <= randomArticleCount; i++) {
          const body = faker.lorem.paragraphs(Math.floor(Math.random() * 1000));
          const shortBody = faker.lorem.sentence(20);
          const title = faker.lorem.sentence();
          const dateTimestamp = faker.date.past();
          const date = dateTimestamp.getTime();

          await this.afStore.collection('articles').add({
            title,
            shortBody,
            body,
            date,
            user: { ...fakeUser, uid }
          });
          console.log('success');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
