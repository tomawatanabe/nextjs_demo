import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase-client";

type FetchError = string | null;
type Memo = any[] | null;

const Home: NextPage = () => {
  const [fetchError, setFetchError] = useState<FetchError>(null);
  const [memo, setMemo] = useState<Memo>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("test")
        .select()
        .order("id", { ascending: true });

      if (error) {
        setFetchError("couldn't fetch data");
        setMemo(null);
        console.log(error);
      }

      if (data) {
        setMemo(data);
        setFetchError(null);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      {fetchError && <div>{fetchError}</div>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Time</th>
            <th>Memo</th>
          </tr>
        </thead>
        <tbody>
          {memo?.map((memo) => {
            return (
              <tr key={memo.id}>
                <td>{memo.id}</td>
                <td>{memo.created_at}</td>
                <td>{memo.memo}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Home;
