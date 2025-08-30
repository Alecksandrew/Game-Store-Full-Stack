import { type JSX } from 'react';
import ReviewForm from './ReviewForm';







export default function ReviewSection({className}: {className?:string}): JSX.Element {


  return (
    <section className={className}>
      <h2 className='text-text-primary text-3xl mb-3'>Reviews</h2>
      <ReviewForm/>
      
    </section>
  );
}