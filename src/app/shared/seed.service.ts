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
        console.log('randomArticleCount');
        console.log(randomArticleCount);
        // tslint:disable-next-line:no-shadowed-variable
        for (let i = 0; i <= randomArticleCount; i++) {
          console.log('i <= randomArticleCount');
          console.log(i <= randomArticleCount);
          console.log(i , randomArticleCount);
          const body = faker.lorem.paragraphs(Math.floor(Math.random() * 100));
          const shortBody = faker.lorem.sentence(20);
          const title = faker.lorem.sentence();
          const dateTimestamp = faker.date.past();
          const date = dateTimestamp.getTime();
          const ratings = faker.random.number({ min: 1, max: 10 });
          const views = faker.random.number({ min: 1, max: 100 });

          const topics = ['C++', 'Java', 'Javascript', 'Python', '.Net', 'NodeJS', 'Go'];
          const randomTopic = topics[Math.floor(topics.length * Math.random())];

          const tags = ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5', 'tag 6', 'tag 7', 'tag 8', 'tag 9', 'tag 10'];
          const tagsArr = [];
          // tslint:disable-next-line:no-shadowed-variable
          for (let i = 0; i <= 2; i++) {
            const randomTag = tags[Math.floor(tags.length * Math.random())];
            if (!tagsArr.includes(randomTag)) {
              tagsArr.push(randomTag);
            }
          }

          await this.afStore.collection('articles').add({
            title,
            shortBody,
            body,
            topic: randomTopic,
            tags: tagsArr,
            ratings,
            views,
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
