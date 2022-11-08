import 'reflect-metadata';
import { Container } from 'inversify';
import { SharedService } from '../services/shared/shared.service';
import { TextService } from '../services/text.service';
import { TYPES } from './types.inversify';

const container = new Container({
	defaultScope: 'Singleton'
});


container.bind<TextService>(TYPES.TextService).to(TextService);
container.bind<SharedService>(TYPES.SharedService).to(SharedService);

export default container;