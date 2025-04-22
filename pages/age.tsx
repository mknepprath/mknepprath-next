import React from "react";

interface Props {
  year: number;
  name?: string;
}

export default function Age({ year, name }: Props) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>
        {name || `This person`} turns {age} in {currentYear}.
      </h1>
    </div>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: { year: string; name?: string };
}): Promise<{ props: Props }> {
  const props: Props = {
    year: parseInt(query.year, 10),
  };
  if (query.name) props.name = query.name;
  return {
    props,
  };
}
