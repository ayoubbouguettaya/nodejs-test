import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserReposService } from 'src/database/users.repository.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

describe('UsersService', () => {
  let service: UsersService;
  let userReposService: DeepMocked<UserReposService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserReposService,
          useValue: createMock<UserReposService>(),
        },

      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userReposService = module.get(UserReposService)
  });

  describe('create User', () => {

    beforeEach(() => {
      jest.clearAllMocks()

    })
    it('should throw an error when existed user by email', async () => {

      const user = {
        firstName: "firstcer", lastName: "azefzerf", birthDay: "1998/10/18", email: "myemail@foo.bar", password: "my pass"
      }
      // prepare
      userReposService.getByEmail.mockResolvedValue({ id: "randomid", ...user })

      // act
      let serviceResult
      try {
        serviceResult = await service.create(user)
      } catch (error) {
        serviceResult = error;
      }

      // assert
      expect(serviceResult).toStrictEqual(new ConflictException("user already exist with this email"))
    })

    it('should create user successfully with encrypted password', async () => {

      // prepare
      const saltRounds = 10;
      const password = await bcrypt.hash("my password", saltRounds)

      const user = {
        firstName: "firstcer",
        lastName: "azefzerf",
        birthDay: "1998/10/18",
        email: "myemail@foo.bar",
        password
      }
      userReposService.getByEmail.mockResolvedValue(null)
      userReposService.create.mockImplementation((data) => Promise.resolve({ ...data, id: "randomId" }))

      // act
      let serviceResult
      try {
        serviceResult = await service.create(user)
      } catch (error) {
        serviceResult = error;
      }

      // assert
      expect(serviceResult).toStrictEqual({ id: "randomId", ...user })
    })
  })

  describe('edit User', () => {

    beforeEach(() => {
      jest.clearAllMocks()

    })
    it('should throw an error when user Not found', async () => {
      // prepare
      userReposService.update.mockResolvedValue(null)

      // act
      let serviceResult
      try {
        serviceResult = await service.update("someid", {birthDay: "2000/01/01",firstName: "fname",lastName: "lastname"})
      } catch (error) {
        serviceResult = error;
      }

      // assert
      expect(serviceResult).toStrictEqual(new NotFoundException("user Not Found with provided ID"))
    })

    it('should update the user', async () => {

      // prepare
      const saltRounds = 10;
      const password = await bcrypt.hash("my password", saltRounds)

      const user = {
        id: "someid",
        firstName: "firstcer",
        lastName: "azefzerf",
        birthDay: "1998/10/18",
        email: "myemail@foo.bar",
        password
      }

      const patchedUser = { firstName: "newfirstName" ,birthDay: "1998/10/18",lastName: "newlastname"}

      userReposService.getByEmail.mockResolvedValue(null)
      userReposService.update.mockImplementation(
        (id, data) =>
          Promise.resolve({ ...user, ...data }))

      // act
      let serviceResult
      try {
        serviceResult = await service.update("someid", patchedUser)
      } catch (error) {
        serviceResult = error;
      }

      // assert
      expect(serviceResult).toStrictEqual({ id: "randomId",...user, ...patchedUser })
    })
  })
});
