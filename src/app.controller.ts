import { Controller, Get, Query, Req } from '@nestjs/common';
import { AlertWidgetRepository } from './alert-widget/alert-widget.repository';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  '536880943894-s0uhcps3eua28d3u2ee3b2aece50gupa.apps.googleusercontent.com',
  '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',
  'http://localhost:3000/auth/google/callback',
);

const scopes = [
  'https://www.googleapis.com/auth/youtube.readonly'
];

@Controller()
export class AppController {
  constructor(private readonly alertWidgetRepository: AlertWidgetRepository) { }

  // @Get('alert-widgets/:test/donation-alerts')
  // async f() {
  //   return 's'
  // }

  @Get('ping')
  async pingGet() {
    return 'pong';
  }

  @Get('auth/google/callback')
  async g(@Query() code) {
    console.log(code);
    let { tokens } = await oauth2Client.getToken(code);
    console.log(tokens);
    oauth2Client.setCredentials(tokens);

    const youtube = google.youtube({
      version: 'v3',
      auth: oauth2Client,
    });

    youtube.channels.list({
      mine: true,
    }, (err, res) => {
      if (err) {
        console.error('Error fetching channel data:', err);
        return;
      }

      const channels = res?.data.items;
    });

    // const drive = google.drive('v3');
    //     drive.files.list({
    //       auth: oauth2Client,
    //       pageSize: 10,
    //       fields: 'nextPageToken, files(id, name)',
    //     }, (err1, res1) => {
    //       if (err1) return console.log('The API returned an error: ' + err1);
    //       const files = res1?.data.files;
    //       if (files?.length) {
    //         console.log('Files:');
    //         files.map((file) => {
    //           console.log(`${file.name} (${file.id})`);
    //         });
    //       } else {
    //         console.log('No files found.');
    //       }
    //     });
  }

  @Get('test')
  test() {


    const authorizationUrl = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
      /** Pass in the scopes array defined above.
        * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
      scope: scopes,
      // Enable incremental authorization. Recommended as a best practice.
      include_granted_scopes: true
    });

    return authorizationUrl

    return this.alertWidgetRepository.findMany({
      where: { userId: '80012aa2-afbd-45d2-8917-2dd8a290a5a5' },
    });
  }
}
