import { forwardRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react';
export function Button({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...props} className={`button ${className}`}/>;
}
export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { label: string }>(function TextInput({ label, id, ...props }, ref) {
  return <label className="field" htmlFor={id}><span>{label}</span><input {...props} id={id} ref={ref}/></label>;
});
export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return <section className="empty-state"><h1 tabIndex={-1}>{title}</h1><p>{children}</p></section>;
}
