import { Query, Arg, Resolver, Mutation, ID } from "type-graphql";
import { User } from "../entities/User";
import dataSource from "../utils";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string
  ): Promise<User> {
    return await dataSource.getRepository(User).save({ firstname, lastname });
  }
  @Mutation(() => User)
  async deleteUser(): Promise<any> {
    return await dataSource
      .getRepository(User)
      .createQueryBuilder()
      .delete()
      .from(User)
      .execute();
  }
  @Mutation(() => User)
  async deleteOneUser(@Arg("id", () => ID) id: number): Promise<any> {
    return await dataSource
      .getRepository(User)
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id })
      .execute();
  }
  @Mutation(() => User)
  async updateUser(
    @Arg("id", () => ID) id: number,
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string
  ) {
    const userToUpdate = await dataSource
      .getRepository(User)
      .findOne({ where: { id } });

    if (userToUpdate === null) {
      return null;
    }
    if (firstname !== null) {
      userToUpdate.firstname = firstname;
    }
    if (lastname !== null) {
      userToUpdate.lastname = lastname;
    }
    return await dataSource.getRepository(User).save(userToUpdate);
  }
  @Query(() => [User], { nullable: true })
  async users(): Promise<User[]> {
    const users = await dataSource.getRepository(User).find({});
    return users;
  }
  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => ID) id: number): Promise<User | null> {
    return await dataSource.getRepository(User).findOne({ where: { id } });
  }
}
