import {Router} from 'express';
import {encryptSession} from '../controller/EncryptController';
import {sendFile, sendImage, sendMessage} from '../controller/MessageController';
import {closeSession, showAllSessions, startAllSessions, startSession} from '../controller/SessionController';
import {createGroup, joinGroupByCode} from "../controller/GroupController";
import {setProfileImage, setProfileName, showAllContacts} from "../controller/DeviceController";
import verifyToken from '../middleware/auth';
import statusConnection from '../middleware/statusConnection';

export const routes = new Router();

//Generate Token
routes.post('/api/:session/:secretkey/generate-token', encryptSession);

//Start All Sessions
routes.post('/api/:secretkey/start-all', startAllSessions);

//Sessions
routes.get('/api/:session/show-all-sessions', verifyToken, statusConnection, showAllSessions);
routes.get('/api/:session/start-session', verifyToken, startSession);
routes.get('/api/:session/close-session', verifyToken, statusConnection, closeSession);

//SendMessages
routes.post('/api/:session/send-message', verifyToken, statusConnection, sendMessage);
routes.post('/api/:session/send-image', verifyToken, statusConnection, sendImage);
routes.post('/api/:session/send-file', verifyToken, statusConnection, sendFile);

// Group Functions
routes.post('/api/:session/create-group', verifyToken, statusConnection, createGroup);
routes.post('/api/:session/join-code', verifyToken, statusConnection, joinGroupByCode);

// Device Functions
routes.post('/api/:session/change-username', verifyToken, statusConnection, setProfileName);
routes.post('/api/:session/change-profile-image', verifyToken, statusConnection, setProfileImage);
routes.get('/api/:session/show-all-contacts', verifyToken, statusConnection, showAllContacts);
