import React from "react";
import AutoComplete, {
  AutoCompleteProps,
  DataSourceType,
} from "./autoComplete";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "mj-template/autoComplete",
  component: AutoComplete,
} as Meta;

interface LakerPlayerProps {
  value: string;
  number: number;
}
interface GitHubProps {
  value: string;
  url: string;
}
// const Template: Story<AutoCompleteProps> = (args) => <AutoComplete {...args}/>

export const autoCompleteExample = () => {
  // const suggestions = ['Devontae','James','caruso', 'Howard', 'Kuzma', 'Smith', 'Green', 'Davis'];
  const lakersWithNumber = [
    { value: "bradley", number: 11 },
    { value: "pope", number: 1 },
    { value: "caruso", number: 4 },
    { value: "cook", number: 2 },
    { value: "cousins", number: 15 },
    { value: "james", number: 23 },
    { value: "AD", number: 3 },
    { value: "green", number: 14 },
    { value: "howard", number: 39 },
    { value: "kuzma", number: 0 },
  ];
  const renderOption = (item: DataSourceType<LakerPlayerProps>) => {
    return (
      <>
        <h2>Name: {item.value}</h2>
        <h2>number: {item.number}</h2>
      </>
    );
  };
  return (
    <AutoComplete
      fetchSuggestions={(item) =>
        lakersWithNumber.filter((el) =>
          el.value.toLowerCase().includes(item.toLowerCase())
        )
      }
      renderOption={renderOption}
    />
  );
};

export const autoCompleteRemoteExample = () => {
  // const suggestions = ['Devontae','James','caruso', 'Howard', 'Kuzma', 'Smith', 'Green', 'Davis'];
  const handleFetch = (q: string) => {
    return fetch(`https://api.github.com/search/users?q=${q}`)
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items);
        if (items && items.length > 0) {
          return items.slice(0, 10).map((item: any) => ({
            value: item.login,

            ...item,
          }));
        } else {
          return [];
        }
      });
  };

  const renderOption = (item: DataSourceType<GitHubProps>) => {
    return (
      <>
        <h2>Name: {item.value}</h2>
        <h2>url: {item.url}</h2>
      </>
    );
  };
  return (
    <AutoComplete fetchSuggestions={handleFetch} renderOption={renderOption} />
  );
};
