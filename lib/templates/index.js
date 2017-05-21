'use babel';

import FullComp from './FULLCOMP';
import FullCont from './FULLCONT';
import LessComp from './LESSCOMP';
import LessCont from './LESSCONT';

import {
  FULLCOMP,
  FULLCONT,
  LESSCOMP,
  LESSCONT,
} from '../constants';

export default {
  [FULLCOMP]: FullComp,
  [FULLCONT]: FullCont,
  [LESSCOMP]: LessComp,
  [LESSCONT]: LessCont,
};
