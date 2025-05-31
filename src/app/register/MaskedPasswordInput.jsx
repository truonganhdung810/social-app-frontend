import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { BiShow } from 'react-icons/bi'

const MaskedPasswordInput = forwardRef(
  (
    {
      value,
      setPassword,
      placeholder = 'Password',
      name = 'password',
      className,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const passwordRef = useRef(null)
    const lastLengthRef = useRef(value?.length || 0)
    const [isHasPassword, setIsHasPassword] = useState(false)

    useImperativeHandle(ref, () => ({
      getValue: () => value,
    }))

    const handleChange = (e) => {
      const input = e.target
      if (input.value.length > 0) setIsHasPassword(true)
      else {
        setIsHasPassword(false)
      }
      const newMaskedValue = input.value
      const newLength = newMaskedValue.length
      const selectionPos = input.selectionStart
      const oldValue = value

      if (newLength > lastLengthRef.current) {
        // Gõ thêm ký tự
        const addedChar = newMaskedValue[newLength - 1]
        if (addedChar === ' ') return // Vô hiệu hoá dấu cách
        const insertPos = selectionPos - 1
        const updated =
          oldValue.slice(0, insertPos) + addedChar + oldValue.slice(insertPos)
        setPassword(updated)
      } else {
        // Xoá ký tự
        const deleteCount = lastLengthRef.current - newLength
        const deletePos = selectionPos
        const updated =
          oldValue.slice(0, deletePos) + oldValue.slice(deletePos + deleteCount)
        setPassword(updated)
      }

      lastLengthRef.current = newLength
    }

    const handleMouseDown = () => setShowPassword(true)
    const handleMouseUp = () => setShowPassword(false)

    return (
      <div
        className={className}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <input
          ref={passwordRef}
          type="text"
          placeholder={placeholder}
          autoComplete="off"
          name={name}
          value={showPassword ? value : '*'.repeat(value.length)}
          onChange={handleChange}
          className="form-input"
          style={{ flex: 1 }}
        />
        {isHasPassword && (
          <button
            type="button"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ marginLeft: '10px', marginRight: '10px' }}
          >
            <BiShow
              style={{
                scale: '1.2',
                color: showPassword ? 'rgb(44, 134, 81)' : 'inherit',
              }}
            ></BiShow>
          </button>
        )}
      </div>
    )
  }
)

export default MaskedPasswordInput
