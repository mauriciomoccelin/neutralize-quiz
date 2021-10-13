import { datatype, internet, lorem, name, random } from 'faker';

import { Role } from '../../src/modules/roles/role.enum';
import { UserDto } from '../../src/modules/users/dto/user.dto';
import { SaveQuizDto } from '../../src/modules/quiz/dto/save-quiz.dto';
import { QuizCategoryDto } from '../../src/modules/quiz/dto/quiz-category.dto';
import { QuizQuestionDto } from '../../src/modules/quiz/dto/quiz-question.dto';
import { QuizQuestionType } from '../../src/modules/quiz/models/quiz-question-type';

export const roles: Role[] = [Role.Admin, Role.User];
export const quizQuestionType = [
  QuizQuestionType.Number,
  QuizQuestionType.SmallText,
  QuizQuestionType.LongText,
  QuizQuestionType.SingleSelection,
  QuizQuestionType.MultipleSelection,
  QuizQuestionType.Radio,
  QuizQuestionType.CheckBox,
];

export const genereteUserDto = (): UserDto => ({
  roles: roles,
  email: internet.email().toLowerCase(),
  username: internet.userName().toLowerCase(),
  password: internet.password(8),
  name: name.firstName() + ' ' + name.lastName(),
});

export const generetSaveQuizDto = (): SaveQuizDto => ({
  _id: null,
  active: datatype.boolean(),
  description: lorem.sentence(),
  quizOf: null,
  categories: Array.from(
    { length: datatype.number({ min: 1, max: 10 }) },
    generetQuizCategoryDto,
  ),
});

export const generetQuizCategoryDto = (): QuizCategoryDto => ({
  active: datatype.boolean(),
  description: lorem.sentence(),
  questions: Array.from(
    { length: datatype.number({ min: 1, max: 10 }) },
    generetQuizQuestionDto,
  ),
});

export const generetQuizQuestionDto = (): QuizQuestionDto => ({
  active: datatype.boolean(),
  description: lorem.sentence(),
  type: random.arrayElement(quizQuestionType),
});
