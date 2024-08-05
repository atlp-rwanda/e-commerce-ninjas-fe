/* eslint-disable */
import React, {useState, useEffect} from 'react';
import { ILocation, IProfile } from '../../utils/types/store';
import { useAppDispatch} from '../../store/store';
import data from '../locations/location';
import { addUserAddress } from '../../store/features/user/userSlice';
import { toast } from "react-toastify";
import { TailSpin } from 'react-loader-spinner';


interface RwandaLocationSelectorProps {
    setLocation?: React.Dispatch<React.SetStateAction<ILocation | null>>;
    user: IProfile,
    isSuccess: boolean,
    isError: string,
    message: string
  }
  
  type RwandaData = {
    [key: string]: {
      [key: string]: {
        [key: string]: {
          [key: string]: {
            [key: string]: string[];
          };
        };
      };
    };
  };
  
  type NestedObject = {
    [key: string]: NestedObject | string[];
  };
  
  const rwandaData: RwandaData = data;

const ShippingAddress:React.FC<RwandaLocationSelectorProps> = ({ user,isSuccess, isError,message,setLocation }) => {

    const dispatch = useAppDispatch();
    const [country, setCountry] = useState('Rwanda');
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [sector, setSector] = useState('');
    const [street, setStreet] = useState("")
    const [loading, setLoading] = useState(false)

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProvince(e.target.value);
        setDistrict('');
        setSector('');
      };
    
      const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDistrict(e.target.value);
        setSector('');
      };
    
      const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSector(e.target.value);
      };
    
      const getOptions = (selectedData: NestedObject) => {
        return Object.keys(selectedData).map(key => <option key={key} value={key}>{key}</option>);
      };

      const billingAddress = (e) => {
        e.preventDefault()
        if (!user) {
            toast.error('User not found.');
            return;
          }
        try {
          setTimeout(()=>{
            setLoading(true)
          },200)
            dispatch(addUserAddress({ id: user.id, data: {province, district, sector, street}}))
            .finally(()=>{
              setLoading(false)
            });
          } catch (error) {
            toast.error(isError);
          }
      }
      useEffect(() => {
        if (user?.addresses) {
          setProvince(user?.addresses.province);
          setDistrict(user?.addresses.district);
          setSector(user?.addresses.sector);
          setStreet(user?.addresses.street);
        }
      }, [user]);

      useEffect(() => {
        setLocation && setLocation({ country, province, district, sector });
      }, [country, province, district, sector, setLocation]);
    
  return (
    <form className="shipping-address" onSubmit={billingAddress}>
          <div className='title'>
            <h1>MY SHIPPING ADDRESS</h1>
            <button type='submit'>
          {loading ? (
            <div className="spinner-container">
              <TailSpin color="#ff6d18" width={20} />
            </div>
          ) : (
            "Save Changes"
          )}
        </button>
          </div>
          <div className="shipping">
            <div >
              <div className='select-inp'>
                <label htmlFor="province">Province</label>
                <select value={province} onChange={handleProvinceChange} name='province' id='province'>
                  <option value="" >Select Province</option>
                  {country && getOptions(rwandaData[country])}
                </select>
              </div>
              <div className='select-inp'>
                <label htmlFor="district">District</label>
                <select value={district} onChange={handleDistrictChange} disabled={!province} name='district' id='district'>
                  <option value="" >Select District</option>
                  {province && getOptions(rwandaData[country][province])}
                </select>
              </div>
            </div>
            <div>
              <div className='select-inp'>
                <label htmlFor="sector">Sector</label>
                <select value={sector} onChange={handleSectorChange} disabled={!district} name='sector' id='sector'>
                  <option value="" >Select Sector</option>
                  {district && getOptions(rwandaData[country][province][district])}
                </select>
              </div>
              <div className='select-inp'>
                <label htmlFor="streetAddress">Street Address:</label>
                <input type='text' value={street} name='streetAddress' onChange={(e)=>setStreet(e.target.value)}/>
              </div>
            </div>
          </div>
        </form>
  );
};

export default ShippingAddress;
