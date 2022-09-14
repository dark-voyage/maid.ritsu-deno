import { Fuse } from "./deps.ts";
import supabase from "./supabase.ts";

export interface User {
  id: number;
  username: string;
  car: string;
}

/*
 * The Supabase Database has Users table
 * The table has 3 rows: id | username | car
 */

export const getCars = async (cursor: number, limit = 10) => {
  // @ts-ignore: Library compatibility issues
  const { data: Users, error } = await supabase
    .from("Users")
    .select("*")
    .order("car")
    .range(cursor, cursor + limit - 1);

  if (error) throw new Error(`${error.message} (hint: ${error.hint})`);
  return Users;
};

export const searchCarV1 = async (car: string) => {
  // @ts-ignore: Library compatibility issues
  const { data: Users, error } = await supabase.from("Users").select("*").eq(
    "car",
    car,
  );

  if (error) throw new Error(`${error.message} (hint: ${error.hint})`);
  return Users;
};

export const searchCarV2 = async (car: string): Promise<User[]> => {
  // @ts-ignore: Library compatibility issues
  const { data: Users, error } = await supabase
    .from("Users")
    .select("*")
    .order("car");
  // .range(cursor, cursor + limit - 1);

  if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

  const fuse = new Fuse([...Users], { keys: ["car"] });
  return fuse.search(car).map((item: any) => item.item);
};

export const addCar = async (id: number, username: string, car: string) => {
  // @ts-ignore: Library compatibility issues
  const { data: User, error } = await supabase.from("Users").insert([{
    id,
    username,
    car,
  }]);

  if (error) throw new Error(`${error.message} (hint: ${error.hint})`);
  return User;
};

export const renewCar = async (id: number, car: string) => {
  // @ts-ignore: Library compatibility issues
  const { data: User, error } = await supabase
    .from("Users")
    .update({ car })
    .eq("id", id);

  if (error) throw new Error(`${error.message} (hint: ${error.hint})`);
  return User;
};
