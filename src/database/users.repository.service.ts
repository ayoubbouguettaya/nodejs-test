import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from "src/users/dto/update-user.dto";

const path = join(process.cwd(), "/src/database/users.json")

@Injectable()
export class UserReposService {

    async get(id: string) {
        const usersFile = await readFile(path, "utf-8")
        const users = JSON.parse(usersFile) as User[]

        return users.find((user) => user.id === id)
    }

    async getByEmail(email: string) {
        const usersFile = await readFile(path, "utf-8")
        const users = JSON.parse(usersFile) as User[]

        return users.find((user) => user.email === email)
    }

    async getAll() {
        const usersFile = await readFile(path, "utf-8")
        const users = JSON.parse(usersFile) as User[]

        return users
    }

    async create(newUser: CreateUserDto) {
        const usersFile = await readFile(path, "utf-8")
        const users = JSON.parse(usersFile) as User[]
        if (users.find((user) => user.email === newUser.email)) return null;

        const newUserWithId = { id: uuidv4(), ...newUser }
        users.push(newUserWithId)
        await writeFile(path, JSON.stringify(users, null, 2))
        
        return newUserWithId
    }

    async update(id: string, patchedUser: UpdateUserDto) {
        const usersFile = await readFile(path, "utf-8")
        const users = JSON.parse(usersFile) as User[]

        let userToUpdate = users.find((user) => user.id === id)

        if (!userToUpdate) return null;

        userToUpdate = { ...userToUpdate, ...patchedUser }

        const newUsers = users.filter(user => user.id !== id)
        newUsers.push(userToUpdate)

        await writeFile(path, JSON.stringify(newUsers, null, 2))

        return userToUpdate;
    }

    async delete(id: string) {
        const usersFile = await readFile(path, "utf-8")
        const users = JSON.parse(usersFile) as User[]

        const userFound = users.find((user) => user.id === id)
        if (!userFound) return null;
        const newUsers = users.filter(user => user.id !== id)

        await writeFile(path, JSON.stringify(newUsers, null, 2))
        return userFound
    }

}