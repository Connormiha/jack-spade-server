// @flow

import http from 'http';
import serverHandle from 'components/request/handler';

http.createServer(serverHandle).listen(3000);
