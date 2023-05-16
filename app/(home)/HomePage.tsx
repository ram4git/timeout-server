"use client";
import {
  Button,
  Card,
  Container,
  Grid,
  Row,
  Spacer,
  Text,
  User,
  useTheme,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Feed from "../posts/Feed";
import Posts from "../posts/page";
import React from "react";

export default function HomePage({ numStars }: { numStars: string }) {
  const { isDark } = useTheme();
  const { data: session } = useSession();
  const { user } = session || {};
  const [data, setData] = React.useState<any>([]);

  React.useEffect(() => {
    fetch(`/api/getPosts`, {
      cache: "no-store",
    }).then(d => d.json())
    .then(d => setData(d));
  }, [])



  return (
    <Container>
      <Spacer />
      <Container gap={0}>
        <Text
          h1
          css={{
            lineHeight: "1.1",
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          Welcome to Sonet{user && ", " + user.name}!
        </Text>
        <Spacer y={1} />

        <Spacer y={0.5} />
        <p>This page simulates the page timeout by using one very slow API</p>

          <Feed data={data} />
      </Container>

    </Container>
  );
}
