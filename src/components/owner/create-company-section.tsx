"use client";

import React, { useState } from 'react'
import { CompanyRegistrationForm } from './company-registration-form';
import { Button } from '../ui/button';

export default function CreateCompanySection() {
    const [open, setOpen] = useState(false);
  return (
    <div className='space-y-4'>
        <Button onClick={()=>setOpen(!open)}>
            {open ? "Cancel" : "Create New Company"}
        </Button>
        {open &&<CompanyRegistrationForm/>}
    </div>
  )
}
