// JavaScript Regular Expressions

// Positive Integers
export const PositiveIntRegex = /^\d+$/;

// Negative Integers
export const NegativeIntRegex = /^-\d+$/;

// Integer
export const IntRegex = /^-?\d+$/;

// Positive Number
export const PositiveNumRegex = /^\d*\.?\d+$/;

// Negative Number
export const NegativeNumRegex = /^-\d*\.?\d+$/;

// Positive Number or Negative Number
export const PositiveOrNegativeNumRegex = /^-?\d*\.?\d+$/;

// Digits Only
// This regex will test for digits (whole numbers).
export const DigitsOnlyRegex = /^[0-9]+$/;

// Alphabetic Characters
// This regex will test for alphabetic characters only (upper and lowercase).
export const AlphabeticCharsRegex = /^[a-zA-Z]+$/;

// Alpha-Numeric Characters Only
// Test for alpha-numeric characters with this regexp.
export const AlphaNumbericCharsRegex = /^[a-zA-Z0-9]+$/;

// Personal Name
export const NameRegex = /^[\w.']{2,}(\s[\w.']{2,})+$/;

// Username
export const UsernameRegex = /^[\w\d_.]{4,}$/;


// Year 1900-2099
export const YearRegex = /^(19|20)\d{2}$/;

// Date (dd mm yyyy, d/m/yyyy, etc.)
export const DateMonthYearRegex = /^([1-9]|0[1-9]|[12][0-9]|3[01])\D([1-9]|0[1-9]|1[012])\D(19[0-9][0-9]|20[0-9][0-9])$/;

// Date (MM/DD/YYYY)
// Validate the calendar date in MM/DD/YYYY format with this regex. Optional separators are spaces, hyphens, forward slashes, and periods. The year is limited between 1900 and 2099.
export const MonthDayYearRegex = /^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/;

// Date (YYYY/MM/DD)
// Validate the calendar date in YYYY/MM/DD format with this regex. Optional separators are spaces, hyphens, forward slashes, and periods. The year is limited between 1900 and 2099.
export const YearMonthDayRegex = /^(19|20)?[0-9]{2}[- /.](0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])$/;


// Emails
// This email regex is not fully RFC5322-compliant, but it will validate most common email address formats correctly.
export const EmailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const ReduxFormEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

// email
export const EmailTwoRegex = /^[_]*([a-z0-9]+(\.|_*)?)+@([a-z][a-z0-9-]+(\.|-*\.))+[a-z]{2,6}$/;


// Passwords
// Test for a strong password with this regex. The password must contain one lowercase letter, one uppercase letter, one number, and be at least 6 characters long.
export const PasswordRegex = /(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*/;

// Password at least 6 symbols
export const PasswordTwoRegex = /^.{6,}$/;

// Password or empty input
export const PasswordThreeRegex = /^.{6,}$|^$/;

// Password
export const PasswordFourRegex = /^[a-z0-9_-]{6,18}$/;



// Phone number
export const PhoneRegex = /^\+?[\d\s]{3,}$/;

// Phone with code
export const PhoneWithCodeRegex = /^\+?[\d\s]+\(?[\d\s]{10,}$/;

// Phone Numbers (North American)
// This regex will validate a 10-digit North American telephone number. Separators are not required, but can include spaces, hyphens, or periods. Parentheses around the area code are also optional.
export const PhoneNumRegex = /^(([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$/;

// URLs
// This URL regex will validate most common URL formats correctly.
// export const URLRegex = /^((http|https|ftp)://)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]/+=%&_\.~?\-]*)$/;
// export const URLRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/

// Match Url
export const URLRegex = /^http\:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

// domain
export const DomainRegex = /^([a-z][a-z0-9-]+(\.|-*\.))+[a-z]{2,6}$/;


// US ZIP Codes
// This regexp verifies US ZIP Codes, with an optional 4 number ZIP code extension.
export const USZipRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

// Canadian Postal Codes
// Tests for valid Canadian Postal Codes.
export const CanadianPostalCodeRegex = /^[ABCEGHJKLMNPRSTVXY][0-9][A-Z] [0-9][A-Z][0-9]$/;

// All Major Credit Cards
// This regular expression will validate all major credit cards: American Express (Amex), Discover, Mastercard, and Visa.
export const CreditCardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})$/;


// HTML Tag
export const HTMLTagRegex = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/;

// Hex
export const HexRegex = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/;

// Hexadecimal color
export const HexColorRegex = /^([a-f0-9]{6}|[a-f0-9]{3})$/;

// UUID
export const UUIDRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

// IP v4:
export const IPv4Regex = /^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]){3}$/;


// Match no input
export const NoInputRegex = /^$/;

// Match blank input
export const BlankInputRegex = /^\s\t*$/;

// Match New line
export const NewLineRegex = /[\r\n]|$/;

// Match white Space
export const WhiteSpaceRegex = /^\s+$/;

// Eth Wallet Validation
import SHA3 from 'crypto-js/sha3';

export const sha3 = (value) => {
  return SHA3(value, {
    outputLength: 256
  }).toString();
};

export const isAddress = (address) => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // Check if it has the basic requirements of an address
    return false;
  }
  else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
    // If it's all small caps or all all caps, return true
    return true;
  }
  else {
    // Otherwise check each case
    return isChecksumAddress(address);
  }
};

export const isChecksumAddress = function (address) {
  // Check each case
  address = address.replace('0x', '');
  let addressHash = sha3(address.toLowerCase());

  for (let i = 0; i < 40; i++) {
    // The nth letter should be uppercase if the nth digit of casemap is 1
    if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
      (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
      return false;
    }
  }
  return true;
};
