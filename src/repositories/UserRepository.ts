import { Entity, EntityRepository, Repository } from "typeorm";
import { Users } from "../models/User";

@EntityRepository(Users)
class UserRepository extends Repository<Users> {}

export { UserRepository }