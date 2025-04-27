'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/auth/auth-provider';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/app/utils/api-client';

// Define interface for profile data
interface ProfileData {
  id?: string;
  username?: string;
  email?: string;
  isAdmin?: boolean;
}

export default function AuthProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        // Replace 'users/profile' with your actual endpoint
        const data = await apiClient.get('/');
        console.log('data', data);
        // setProfileData(data);

        // Populate form with server data if available
        // if (data) {
        //   setDisplayName(data.username || user?.username || '');
        //   setEmail(data.email || user?.email || '');
        // }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      // Update the profile data via API
      await apiPost<ProfileData>('users/profile', {
        username: displayName,
        email: email
      });

      // Refresh profile data after successful update
      const updatedData = await apiGet<ProfileData>('users/profile');
      setProfileData(updatedData);

      setIsEditing(false);
      setError('');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="auth-profile-page">
      <h1>User Profile Management</h1>
      <p>View and edit your profile settings</p>

      {loading && <div className="loading-indicator">Loading profile data...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {/* This would display a user avatar */}
            <div className="avatar-placeholder">
              {displayName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          </div>

          <div className="profile-title">
            <h2>{displayName || 'User'}</h2>
            <p>{email}</p>
            <span className="user-role">{profileData?.isAdmin ? 'Administrator' : 'User'}</span>
          </div>
        </div>

        <div className="profile-details">
          {isEditing ? (
            <div className="profile-form">
              <div className="form-group">
                <label htmlFor="displayName">Display Name</label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-actions">
                <button
                  onClick={handleSave}
                  className="save-button"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="cancel-button"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-info">
              <div className="info-row">
                <span className="label">Display Name:</span>
                <span className="value">{displayName}</span>
              </div>

              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{email}</span>
              </div>

              <div className="info-row">
                <span className="label">User ID:</span>
                <span className="value">{profileData?.id || user?.id}</span>
              </div>

              <div className="info-row">
                <span className="label">Role:</span>
                <span className="value">{profileData?.isAdmin ? 'Administrator' : 'User'}</span>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
                disabled={loading}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        <div className="profile-actions">
          <button
            onClick={() => router.push('/auth/dashboard')}
            className="back-button"
          >
            Back to Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
