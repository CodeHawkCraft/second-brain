import  { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import Button from './ui/Button';
import { GoPlus } from 'react-icons/go';
import Card, { CardProps } from './Card';
import { activeTabValidValues } from './SideBar';
import {  getContent } from '../api/contentApi';
import AddContent from './AddContent';
import { useDebounce } from '../hooks/useDebounce';
import { SearchContentOptionType } from '../utils/type';
import { PiSmileySadFill } from 'react-icons/pi';
import { SiDeepin } from 'react-icons/si';
import CardShimmer from './CardShimmer';



  type DashboardContentProps={
    activeTab:activeTabValidValues;
  }

  export type AddcontentType={
    title:string;
    content:string;
    type:string;
    description:string;
  }


const DashboardContent = ({activeTab}:DashboardContentProps) => {
     const [searchTerm, setSearchTerm] = useState('');
     const [addContent,setAddContent]=useState(false);
      const [content, setContent] = useState<CardProps[]|null>(null);
  
      const [loading,setLoading]=useState(true);
  const debouncedValue=useDebounce(searchTerm);

  async function fetchContent(isDeepSearch:boolean=false) {
    try {
      let response;
      if (debouncedValue) {
        setLoading(true);
        response = (await getContent(
          activeTab,
          debouncedValue,
          searchOption,
          isDeepSearch
        )) as CardProps[];
      } else {
        response = (await getContent(activeTab)) as CardProps[];
      }
      setContent(response);
    } catch (error) {
      
    }
    finally{
      setLoading(false);
    }
  }
  
  useEffect(()=>{
    fetchContent();
  },[activeTab,debouncedValue])
  const [searchOption,setSearchOption]=useState<SearchContentOptionType>('title');
  return (
    <div className="p-6 overflow-y-auto py-10 flex flex-col gap-10 flex-1 lg:p-10 bg-slate-50">
      {/* search bar */}
      <div className="border relative items-center bg-white flex  rounded-md  transition-colors border-gray-300 focus-within:border-primary-500">
        <CiSearch className="pl-2 h-8 w-8 text-gray-600" />
        <input
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          value={searchTerm}
          placeholder={
            searchOption == "title" ? "Enter Title" : "Enter Description"
          }
          className="p-3 rounded-md outline-none w-full"
        />
        <select
          value={searchOption}
          onChange={(e) =>
            setSearchOption(e.target.value as SearchContentOptionType)
          }
          className="absolute h-full outline-none right-2"
        >
          <option value="title">Search with Title</option>
          <option value="description">Search with Description</option>
        </select>
      </div>

      {/* buttons and heading */}
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">
          Your Saved Content
        </h2>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClickWithoutEvent={() => {
              fetchContent(true);
            }}
            disabled={!searchTerm}
            startIcon={<SiDeepin />}
            text="Deep Search"
            size="md"
          />
          <Button
            onClickWithoutEvent={() => {
              setAddContent(true);
            }}
            variant="primary"
            startIcon={<GoPlus />}
            text="Add Content"
            size="md"
          />
        </div>
      </div>

      
      <div className="grid gap-10 lg:grid-cols-3">
        {loading ? (
          <>
            <CardShimmer />
            <CardShimmer />
            <CardShimmer />
          </>
        ) : (
          <>
            {content?.map((card, index) => {
              return (
                <Card
                  key={index}
                  onDelete={() => {
                    setContent(content.filter((c) => c._id !== card._id));
                  }}
                  {...card}
                ></Card>
              );
            })}
          </>
        )}
      </div>

      {/* no content available */}
      {content?.length == 0 && !loading && (
        <div className="flex w-full items-center p-10 flex-col gap-4">
          <PiSmileySadFill className="h-10 w-10 text-primary-500" />
          <h2 className="uppercase text-gray-500 text-2xl">No Content Added</h2>
        </div>
      )}

      {/* add content form */}
      {addContent && (
        <AddContent
          onAdd={(value: CardProps) => {
            setContent((prev) => {
              if (prev != null) {
                return [...prev, value];
              }
              return [value];
            });
          }}
          onClose={() => {
            setAddContent(false);
          }}
        ></AddContent>
      )}
    </div>
  );
}

export default DashboardContent