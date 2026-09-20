import React from 'react';
import { useForm } from 'react-hook-form';

export const SignupForm = () => {
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      role: 'PATIENT' // Default form patient ke liye khulega
    }
  });

  const selectedRole = watch('role');

  const onSubmit = (data) => {
    // API call se pehle data format theek karna (Data Sanitization)
    if (data.doctorProfile && data.doctorProfile.yearOfPassing) {
      data.doctorProfile.yearOfPassing = Number(data.doctorProfile.yearOfPassing);
    }
    
    // Yahan tumhara poora JSON payload print hoga
    console.log("🚀 Payload Ready for Backend:", data);
    alert("Check browser console for the JSON data!");
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10 mb-10 border border-slate-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Create NexCare Account</h2>
        <p className="text-slate-500 mt-2">Join us to start your healthcare journey</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* --- 1. COMMON FIELDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">First Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="John"
              {...register('firstName', { required: 'First Name is required' })} 
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.firstName ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="Doe"
              {...register('lastName', { required: 'Last Name is required' })} 
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.lastName ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              placeholder="john@example.com"
              {...register('email', { required: 'Email is required' })} 
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
            <input 
              type="tel" 
              placeholder="9876543210"
              {...register('phoneNumber', { required: 'Phone Number is required' })} 
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.phoneNumber ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password <span className="text-red-500">*</span></label>
          <input 
            type="password" 
            placeholder="Create a strong password"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })} 
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.password ? 'border-red-500' : 'border-slate-300'}`}
          />
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        {/* --- 2. ROLE SELECTION --- */}
        <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
          <label className="block text-base font-semibold text-slate-800 mb-3">I am registering as a:</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-md border shadow-sm hover:bg-slate-50">
              <input type="radio" value="PATIENT" {...register('role')} className="text-teal-600 focus:ring-teal-500 w-4 h-4" />
              <span className="font-medium text-slate-700">Patient</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-md border shadow-sm hover:bg-slate-50">
              <input type="radio" value="DOCTOR" {...register('role')} className="text-teal-600 focus:ring-teal-500 w-4 h-4" />
              <span className="font-medium text-slate-700">Doctor</span>
            </label>
          </div>
        </div>

        {/* --- 3. CONDITIONAL FIELDS: PATIENT --- */}
        {selectedRole === 'PATIENT' && (
          <div className="space-y-4 bg-teal-50/50 p-5 rounded-lg border border-teal-100 animate-in fade-in zoom-in duration-300">
            <h3 className="font-semibold text-teal-800 border-b border-teal-200 pb-2">Patient Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                <select {...register('patientProfile.gender')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                <input type="date" {...register('patientProfile.dateOfBirth')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white" />
              </div>
            </div>
          </div>
        )}

        {/* --- 4. CONDITIONAL FIELDS: DOCTOR --- */}
        {selectedRole === 'DOCTOR' && (
          <div className="space-y-4 bg-blue-50/50 p-5 rounded-lg border border-blue-100 animate-in fade-in zoom-in duration-300">
            <h3 className="font-semibold text-blue-800 border-b border-blue-200 pb-2">Professional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Registration No.</label>
                <input type="text" {...register('doctorProfile.medicalRegistrationNumber')} placeholder="MPMC-2026-10001" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Medical Council</label>
                <input type="text" {...register('doctorProfile.medicalCouncil')} placeholder="M.P. Medical Council" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Registration Date</label>
                <input type="date" {...register('doctorProfile.registrationDate')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Specialization</label>
                <input type="text" {...register('doctorProfile.specialization')} placeholder="Cardiologist" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Primary Qualification</label>
                <input type="text" {...register('doctorProfile.primaryQualification')} placeholder="MBBS" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Additional Qualification</label>
                <input type="text" {...register('doctorProfile.additionalQualification')} placeholder="MD Medicine" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Year of Passing</label>
                <input type="number" {...register('doctorProfile.yearOfPassing')} placeholder="2018" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Place of Work</label>
                <input type="text" {...register('doctorProfile.placeOfWork')} placeholder="City Care Hospital" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="w-full bg-teal-600 text-white font-bold text-lg py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-200 mt-6 shadow-md">
          Complete Registration
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-600 border-t pt-6">
        Already have an account? <span className="text-teal-600 font-semibold cursor-pointer hover:underline">Log in</span>
      </div>
    </div>
  );
};
export default SignupForm
