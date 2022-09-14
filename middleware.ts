import { Fuse } from "./deps.ts";
import supabase from "./lib/supabase.ts";

export const getCars = async (cursor: number, limit = 10) => {
  const { data: Users, error } = await supabase
    .from("Users")
    .select("*")
    .order("module")
    .range(cursor, cursor + limit - 1);

  if (error) throw new Error(`${error.message} (hint: ${error.hint})`);
  return Users;
};

export const searchCarV1 = async (car: string) => {
  const { data: Users, error } = await supabase.from("Users").select("*").eq(
    "car",
    car,
  );

  if (error) throw new Error(`${error.message} (hint: ${error.hint})`);
  return Users;
};

export const searchCarV2 = async (car: string) => {
  const { data: Users, error } = await supabase
    .from("Users")
    .select("*")
    .order("module");
  // .range(cursor, cursor + limit - 1);

  if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

  const fuse = new Fuse([...Users], { keys: ["car"] });
  return fuse.search(car).map((item: any) => item.item);
};

export const addCar = async (id: number, username: string, car: string) => {
  const { data: User, error } = await supabase.from("Users").insert([{
    id,
    username,
    car,
  }]);

  if (error) throw new Error(`${error.message} (hint: ${error.hint})`);
  return User;
};
