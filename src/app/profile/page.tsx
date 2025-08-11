'use client';

import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  EnvelopeIcon, 
  BellIcon, 
  SunIcon, 
  MoonIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { validateProfileForm } from '@/utils/validation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { FormErrors, User } from '@/types';

export default function Profile() {
  const { auth, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
  });
  const [preferences, setPreferences] = useState({
    theme: 'light' as 'light' | 'dark',
    notifications: true,
    newsletter: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth.loading && !auth.isAuthenticated) {
      redirect('/auth/signin');
    }
  }, [auth.loading, auth.isAuthenticated]);

  // Initialize form data when user loads
  useEffect(() => {
    if (auth.user) {
      setFormData({
        displayName: auth.user.displayName,
        email: auth.user.email,
      });
      setPreferences(auth.user.preferences);
    }
  }, [auth.user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePreferenceChange = (key: keyof typeof preferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateProfileForm(formData.displayName, formData.email);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    
    try {
      const updatedUser: Partial<User> = {
        displayName: formData.displayName,
        email: formData.email,
        preferences,
      };
      
      updateUser(updatedUser);
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (auth.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!auth.user) {
    return null; // Will redirect
  }

  const joinDate = new Date(auth.user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Profile Settings
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {auth.user.displayName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {auth.user.email}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  Member since {joinDate}
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Theme
                    </span>
                    <button
                      onClick={toggleTheme}
                      className="flex items-center space-x-2 text-sm text-purple-600 hover:text-purple-700"
                    >
                      {theme === 'light' ? (
                        <>
                          <SunIcon className="w-4 h-4" />
                          <span>Light</span>
                        </>
                      ) : (
                        <>
                          <MoonIcon className="w-4 h-4" />
                          <span>Dark</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Notifications
                    </span>
                    <span className={`text-sm ${preferences.notifications ? 'text-green-600' : 'text-gray-400'}`}>
                      {preferences.notifications ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Settings Forms */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Personal Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <UserIcon className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Personal Information
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    label="Display Name"
                    name="displayName"
                    type="text"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    error={errors.displayName}
                    icon={<UserIcon className="h-5 w-5" />}
                    placeholder="Enter your display name"
                  />

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    icon={<EnvelopeIcon className="h-5 w-5" />}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    loading={loading}
                    className="w-full sm:w-auto"
                  >
                    Update Profile
                  </Button>
                </div>
              </form>
            </div>

            {/* Preferences */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <CogIcon className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Preferences
                </h3>
              </div>

              <div className="space-y-6">
                {/* Notifications */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <BellIcon className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Push Notifications
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive notifications about updates and new features
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={preferences.notifications}
                      onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                {/* Newsletter */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <EnvelopeIcon className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Newsletter Subscription
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive weekly updates and creative tips via email
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={preferences.newsletter}
                      onChange={(e) => handlePreferenceChange('newsletter', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      const updatedUser: Partial<User> = {
                        preferences,
                      };
                      updateUser(updatedUser);
                    }}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-red-200 dark:border-red-800">
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
                Danger Zone
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                Delete Account
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
