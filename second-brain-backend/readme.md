i have particular component 
where user is able to search the content with its title.
but as i am implementing the vector embedding and search vector functionality for content description.
so what is best way should i give two buttons one for search with title and other for search with description.


import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import Button from '../Components/ui/Button';
import { MdShare } from 'react-icons/md';
import { GoPlus } from 'react-icons/go';
import Card, { CardProps } from '../Components/Card';
import PopUp from '../Components/PopUp';
import { activeTabValidValues } from '../Components/SideBar';
import { createContent, getContent } from '../api/contentApi';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FaYoutube } from 'react-icons/fa';
import { RiTwitterXLine } from 'react-icons/ri';
import { addContentValidations, validContentType } from '../utils/validations';
import AddContent from '../Components/AddContent';
import { useDebounce } from '../hooks/useDebounce';



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

  const debouncedValue=useDebounce(searchTerm);

  async function fetchContent() {
    const response = (await getContent(activeTab,debouncedValue)) as CardProps[];
    setContent(response);
    // console.log("response is ------> ",response)
  }
  
  useEffect(()=>{
    fetchContent();
  },[activeTab,debouncedValue])




    

  return (
    <div className="p-6 overflow-y-auto py-10 flex flex-col gap-10 flex-1 lg:p-10 bg-slate-50">
      {/* search bar */}
      <div className="border items-center bg-white flex  rounded-md  transition-colors border-gray-300 focus-within:border-primary-500">
        <CiSearch className="pl-2 h-8 w-8 text-gray-600" />
        <input
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          value={searchTerm}
          placeholder="Search Your Saved Content..."
          className="p-3 rounded-md outline-none w-full"
        />
      </div>

      {/* buttons and heading */}
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">
          Your Saved Content
        </h2>
        <div className="flex gap-3">
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

      {/* cards */}
      <div className="grid gap-10 lg:grid-cols-3">
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
      </div>

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